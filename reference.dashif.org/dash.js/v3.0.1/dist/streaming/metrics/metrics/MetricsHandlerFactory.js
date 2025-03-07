/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

import BufferLevel from './handlers/BufferLevelHandler';
import DVBErrors from './handlers/DVBErrorsHandler';
import HttpList from './handlers/HttpListHandler';
import GenericMetricHandler from './handlers/GenericMetricHandler';

function MetricsHandlerFactory(config) {

    config = config || {};
    let instance;
    const logger = config.debug ? config.debug.getLogger(instance) : {};

    // group 1: key, [group 3: n [, group 5: type]]
    let keyRegex = /([a-zA-Z]*)(\(([0-9]*)(\,\s*([a-zA-Z]*))?\))?/;

    const context = this.context;
    let knownFactoryProducts = {
        BufferLevel: BufferLevel,
        DVBErrors: DVBErrors,
        HttpList: HttpList,
        PlayList: GenericMetricHandler,
        RepSwitchList: GenericMetricHandler,
        TcpList: GenericMetricHandler
    };

    function create(listType, reportingController) {
        var matches = listType.match(keyRegex);
        var handler;

        if (!matches) {
            return;
        }

        try {
            handler = knownFactoryProducts[matches[1]](context).create({
                eventBus: config.eventBus,
                metricsConstants: config.metricsConstants
            });

            handler.initialize(
                matches[1],
                reportingController,
                matches[3],
                matches[5]
            );
        } catch (e) {
            handler = null;
            logger.error(`MetricsHandlerFactory: Could not create handler for type ${matches[1]} with args ${matches[3]}, ${matches[5]} (${e.message})`);
        }

        return handler;
    }

    function register(key, handler) {
        knownFactoryProducts[key] = handler;
    }

    function unregister(key) {
        delete knownFactoryProducts[key];
    }

    instance = {
        create: create,
        register: register,
        unregister: unregister
    };

    return instance;
}

MetricsHandlerFactory.__dashjs_factory_name = 'MetricsHandlerFactory';
export default dashjs.FactoryMaker.getSingletonFactory(MetricsHandlerFactory); /* jshint ignore:line */
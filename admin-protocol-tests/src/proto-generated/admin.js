/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.plantos = (function() {

    /**
     * Namespace plantos.
     * @exports plantos
     * @namespace
     */
    var plantos = {};

    plantos.admin = (function() {

        /**
         * Namespace admin.
         * @memberof plantos
         * @namespace
         */
        var admin = {};

        admin.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof plantos.admin
             * @namespace
             */
            var v1 = {};

            /**
             * Status enum.
             * @name plantos.admin.v1.Status
             * @enum {number}
             * @property {number} STATUS_UNSPECIFIED=0 STATUS_UNSPECIFIED value
             * @property {number} STATUS_IDLE=1 STATUS_IDLE value
             * @property {number} STATUS_WORKING=2 STATUS_WORKING value
             * @property {number} STATUS_PAUSED=3 STATUS_PAUSED value
             * @property {number} STATUS_ERROR=4 STATUS_ERROR value
             * @property {number} STATUS_OFFLINE=5 STATUS_OFFLINE value
             */
            v1.Status = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STATUS_UNSPECIFIED"] = 0;
                values[valuesById[1] = "STATUS_IDLE"] = 1;
                values[valuesById[2] = "STATUS_WORKING"] = 2;
                values[valuesById[3] = "STATUS_PAUSED"] = 3;
                values[valuesById[4] = "STATUS_ERROR"] = 4;
                values[valuesById[5] = "STATUS_OFFLINE"] = 5;
                return values;
            })();

            /**
             * StatisticType enum.
             * @name plantos.admin.v1.StatisticType
             * @enum {number}
             * @property {number} STATISTIC_TYPE_UNSPECIFIED=0 STATISTIC_TYPE_UNSPECIFIED value
             * @property {number} STATISTIC_TYPE_TEMPERATURE=1 STATISTIC_TYPE_TEMPERATURE value
             * @property {number} STATISTIC_TYPE_HUMIDITY=2 STATISTIC_TYPE_HUMIDITY value
             * @property {number} STATISTIC_TYPE_LIGHT=3 STATISTIC_TYPE_LIGHT value
             * @property {number} STATISTIC_TYPE_SOIL_MOISTURE=4 STATISTIC_TYPE_SOIL_MOISTURE value
             * @property {number} STATISTIC_TYPE_BATTERY=5 STATISTIC_TYPE_BATTERY value
             */
            v1.StatisticType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STATISTIC_TYPE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "STATISTIC_TYPE_TEMPERATURE"] = 1;
                values[valuesById[2] = "STATISTIC_TYPE_HUMIDITY"] = 2;
                values[valuesById[3] = "STATISTIC_TYPE_LIGHT"] = 3;
                values[valuesById[4] = "STATISTIC_TYPE_SOIL_MOISTURE"] = 4;
                values[valuesById[5] = "STATISTIC_TYPE_BATTERY"] = 5;
                return values;
            })();

            /**
             * ErrorCode enum.
             * @name plantos.admin.v1.ErrorCode
             * @enum {number}
             * @property {number} ERROR_CODE_UNSPECIFIED=0 ERROR_CODE_UNSPECIFIED value
             * @property {number} ERROR_CODE_INVALID_REQUEST=1 ERROR_CODE_INVALID_REQUEST value
             * @property {number} ERROR_CODE_ZONE_NOT_FOUND=2 ERROR_CODE_ZONE_NOT_FOUND value
             * @property {number} ERROR_CODE_MODULE_NOT_FOUND=3 ERROR_CODE_MODULE_NOT_FOUND value
             * @property {number} ERROR_CODE_ZONE_BUSY=4 ERROR_CODE_ZONE_BUSY value
             * @property {number} ERROR_CODE_MODULE_OFFLINE=5 ERROR_CODE_MODULE_OFFLINE value
             * @property {number} ERROR_CODE_INTERNAL_ERROR=6 ERROR_CODE_INTERNAL_ERROR value
             * @property {number} ERROR_CODE_INVALID_TIME_RANGE=7 ERROR_CODE_INVALID_TIME_RANGE value
             * @property {number} ERROR_CODE_VERSION_MISMATCH=8 ERROR_CODE_VERSION_MISMATCH value
             */
            v1.ErrorCode = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "ERROR_CODE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "ERROR_CODE_INVALID_REQUEST"] = 1;
                values[valuesById[2] = "ERROR_CODE_ZONE_NOT_FOUND"] = 2;
                values[valuesById[3] = "ERROR_CODE_MODULE_NOT_FOUND"] = 3;
                values[valuesById[4] = "ERROR_CODE_ZONE_BUSY"] = 4;
                values[valuesById[5] = "ERROR_CODE_MODULE_OFFLINE"] = 5;
                values[valuesById[6] = "ERROR_CODE_INTERNAL_ERROR"] = 6;
                values[valuesById[7] = "ERROR_CODE_INVALID_TIME_RANGE"] = 7;
                values[valuesById[8] = "ERROR_CODE_VERSION_MISMATCH"] = 8;
                return values;
            })();

            v1.StatisticDataPoint = (function() {

                /**
                 * Properties of a StatisticDataPoint.
                 * @memberof plantos.admin.v1
                 * @interface IStatisticDataPoint
                 * @property {google.protobuf.ITimestamp|null} [timestamp] StatisticDataPoint timestamp
                 * @property {number|null} [value] StatisticDataPoint value
                 */

                /**
                 * Constructs a new StatisticDataPoint.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a StatisticDataPoint.
                 * @implements IStatisticDataPoint
                 * @constructor
                 * @param {plantos.admin.v1.IStatisticDataPoint=} [properties] Properties to set
                 */
                function StatisticDataPoint(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StatisticDataPoint timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @instance
                 */
                StatisticDataPoint.prototype.timestamp = null;

                /**
                 * StatisticDataPoint value.
                 * @member {number} value
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @instance
                 */
                StatisticDataPoint.prototype.value = 0;

                /**
                 * Creates a new StatisticDataPoint instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {plantos.admin.v1.IStatisticDataPoint=} [properties] Properties to set
                 * @returns {plantos.admin.v1.StatisticDataPoint} StatisticDataPoint instance
                 */
                StatisticDataPoint.create = function create(properties) {
                    return new StatisticDataPoint(properties);
                };

                /**
                 * Encodes the specified StatisticDataPoint message. Does not implicitly {@link plantos.admin.v1.StatisticDataPoint.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {plantos.admin.v1.IStatisticDataPoint} message StatisticDataPoint message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StatisticDataPoint.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                        writer.uint32(/* id 2, wireType 5 =*/21).float(message.value);
                    return writer;
                };

                /**
                 * Encodes the specified StatisticDataPoint message, length delimited. Does not implicitly {@link plantos.admin.v1.StatisticDataPoint.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {plantos.admin.v1.IStatisticDataPoint} message StatisticDataPoint message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StatisticDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StatisticDataPoint message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.StatisticDataPoint} StatisticDataPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StatisticDataPoint.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.StatisticDataPoint();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 2: {
                                message.value = reader.float();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StatisticDataPoint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.StatisticDataPoint} StatisticDataPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StatisticDataPoint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StatisticDataPoint message.
                 * @function verify
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StatisticDataPoint.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    if (message.value != null && message.hasOwnProperty("value"))
                        if (typeof message.value !== "number")
                            return "value: number expected";
                    return null;
                };

                /**
                 * Creates a StatisticDataPoint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.StatisticDataPoint} StatisticDataPoint
                 */
                StatisticDataPoint.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.StatisticDataPoint)
                        return object;
                    var message = new $root.plantos.admin.v1.StatisticDataPoint();
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".plantos.admin.v1.StatisticDataPoint.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    if (object.value != null)
                        message.value = Number(object.value);
                    return message;
                };

                /**
                 * Creates a plain object from a StatisticDataPoint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {plantos.admin.v1.StatisticDataPoint} message StatisticDataPoint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StatisticDataPoint.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.timestamp = null;
                        object.value = 0;
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    if (message.value != null && message.hasOwnProperty("value"))
                        object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                    return object;
                };

                /**
                 * Converts this StatisticDataPoint to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StatisticDataPoint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StatisticDataPoint
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.StatisticDataPoint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StatisticDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.StatisticDataPoint";
                };

                return StatisticDataPoint;
            })();

            v1.Statistic = (function() {

                /**
                 * Properties of a Statistic.
                 * @memberof plantos.admin.v1
                 * @interface IStatistic
                 * @property {plantos.admin.v1.StatisticType|null} [type] Statistic type
                 * @property {Array.<plantos.admin.v1.IStatisticDataPoint>|null} [history] Statistic history
                 */

                /**
                 * Constructs a new Statistic.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a Statistic.
                 * @implements IStatistic
                 * @constructor
                 * @param {plantos.admin.v1.IStatistic=} [properties] Properties to set
                 */
                function Statistic(properties) {
                    this.history = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Statistic type.
                 * @member {plantos.admin.v1.StatisticType} type
                 * @memberof plantos.admin.v1.Statistic
                 * @instance
                 */
                Statistic.prototype.type = 0;

                /**
                 * Statistic history.
                 * @member {Array.<plantos.admin.v1.IStatisticDataPoint>} history
                 * @memberof plantos.admin.v1.Statistic
                 * @instance
                 */
                Statistic.prototype.history = $util.emptyArray;

                /**
                 * Creates a new Statistic instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {plantos.admin.v1.IStatistic=} [properties] Properties to set
                 * @returns {plantos.admin.v1.Statistic} Statistic instance
                 */
                Statistic.create = function create(properties) {
                    return new Statistic(properties);
                };

                /**
                 * Encodes the specified Statistic message. Does not implicitly {@link plantos.admin.v1.Statistic.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {plantos.admin.v1.IStatistic} message Statistic message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Statistic.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                    if (message.history != null && message.history.length)
                        for (var i = 0; i < message.history.length; ++i)
                            $root.plantos.admin.v1.StatisticDataPoint.encode(message.history[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Statistic message, length delimited. Does not implicitly {@link plantos.admin.v1.Statistic.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {plantos.admin.v1.IStatistic} message Statistic message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Statistic.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Statistic message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.Statistic} Statistic
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Statistic.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.Statistic();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.type = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.history && message.history.length))
                                    message.history = [];
                                message.history.push($root.plantos.admin.v1.StatisticDataPoint.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Statistic message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.Statistic} Statistic
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Statistic.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Statistic message.
                 * @function verify
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Statistic.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.history != null && message.hasOwnProperty("history")) {
                        if (!Array.isArray(message.history))
                            return "history: array expected";
                        for (var i = 0; i < message.history.length; ++i) {
                            var error = $root.plantos.admin.v1.StatisticDataPoint.verify(message.history[i]);
                            if (error)
                                return "history." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Statistic message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.Statistic} Statistic
                 */
                Statistic.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.Statistic)
                        return object;
                    var message = new $root.plantos.admin.v1.Statistic();
                    switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "STATISTIC_TYPE_UNSPECIFIED":
                    case 0:
                        message.type = 0;
                        break;
                    case "STATISTIC_TYPE_TEMPERATURE":
                    case 1:
                        message.type = 1;
                        break;
                    case "STATISTIC_TYPE_HUMIDITY":
                    case 2:
                        message.type = 2;
                        break;
                    case "STATISTIC_TYPE_LIGHT":
                    case 3:
                        message.type = 3;
                        break;
                    case "STATISTIC_TYPE_SOIL_MOISTURE":
                    case 4:
                        message.type = 4;
                        break;
                    case "STATISTIC_TYPE_BATTERY":
                    case 5:
                        message.type = 5;
                        break;
                    }
                    if (object.history) {
                        if (!Array.isArray(object.history))
                            throw TypeError(".plantos.admin.v1.Statistic.history: array expected");
                        message.history = [];
                        for (var i = 0; i < object.history.length; ++i) {
                            if (typeof object.history[i] !== "object")
                                throw TypeError(".plantos.admin.v1.Statistic.history: object expected");
                            message.history[i] = $root.plantos.admin.v1.StatisticDataPoint.fromObject(object.history[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Statistic message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {plantos.admin.v1.Statistic} message Statistic
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Statistic.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.history = [];
                    if (options.defaults)
                        object.type = options.enums === String ? "STATISTIC_TYPE_UNSPECIFIED" : 0;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.plantos.admin.v1.StatisticType[message.type] === undefined ? message.type : $root.plantos.admin.v1.StatisticType[message.type] : message.type;
                    if (message.history && message.history.length) {
                        object.history = [];
                        for (var j = 0; j < message.history.length; ++j)
                            object.history[j] = $root.plantos.admin.v1.StatisticDataPoint.toObject(message.history[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Statistic to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.Statistic
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Statistic.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Statistic
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.Statistic
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Statistic.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.Statistic";
                };

                return Statistic;
            })();

            v1.Zone = (function() {

                /**
                 * Properties of a Zone.
                 * @memberof plantos.admin.v1
                 * @interface IZone
                 * @property {number|null} [id] Zone id
                 * @property {number|null} [moduleId] Zone moduleId
                 * @property {string|null} [name] Zone name
                 * @property {string|null} [icon] Zone icon
                 * @property {plantos.admin.v1.Status|null} [status] Zone status
                 * @property {google.protobuf.ITimestamp|null} [lastWatered] Zone lastWatered
                 * @property {Array.<plantos.admin.v1.IStatistic>|null} [currentStatistics] Zone currentStatistics
                 */

                /**
                 * Constructs a new Zone.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a Zone.
                 * @implements IZone
                 * @constructor
                 * @param {plantos.admin.v1.IZone=} [properties] Properties to set
                 */
                function Zone(properties) {
                    this.currentStatistics = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Zone id.
                 * @member {number} id
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.id = 0;

                /**
                 * Zone moduleId.
                 * @member {number} moduleId
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.moduleId = 0;

                /**
                 * Zone name.
                 * @member {string} name
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.name = "";

                /**
                 * Zone icon.
                 * @member {string} icon
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.icon = "";

                /**
                 * Zone status.
                 * @member {plantos.admin.v1.Status} status
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.status = 0;

                /**
                 * Zone lastWatered.
                 * @member {google.protobuf.ITimestamp|null|undefined} lastWatered
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.lastWatered = null;

                /**
                 * Zone currentStatistics.
                 * @member {Array.<plantos.admin.v1.IStatistic>} currentStatistics
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 */
                Zone.prototype.currentStatistics = $util.emptyArray;

                /**
                 * Creates a new Zone instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {plantos.admin.v1.IZone=} [properties] Properties to set
                 * @returns {plantos.admin.v1.Zone} Zone instance
                 */
                Zone.create = function create(properties) {
                    return new Zone(properties);
                };

                /**
                 * Encodes the specified Zone message. Does not implicitly {@link plantos.admin.v1.Zone.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {plantos.admin.v1.IZone} message Zone message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Zone.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.moduleId != null && Object.hasOwnProperty.call(message, "moduleId"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.moduleId);
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                    if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.icon);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.status);
                    if (message.lastWatered != null && Object.hasOwnProperty.call(message, "lastWatered"))
                        $root.google.protobuf.Timestamp.encode(message.lastWatered, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    if (message.currentStatistics != null && message.currentStatistics.length)
                        for (var i = 0; i < message.currentStatistics.length; ++i)
                            $root.plantos.admin.v1.Statistic.encode(message.currentStatistics[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Zone message, length delimited. Does not implicitly {@link plantos.admin.v1.Zone.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {plantos.admin.v1.IZone} message Zone message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Zone.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Zone message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.Zone} Zone
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Zone.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.Zone();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.id = reader.int32();
                                break;
                            }
                        case 2: {
                                message.moduleId = reader.int32();
                                break;
                            }
                        case 3: {
                                message.name = reader.string();
                                break;
                            }
                        case 4: {
                                message.icon = reader.string();
                                break;
                            }
                        case 5: {
                                message.status = reader.int32();
                                break;
                            }
                        case 6: {
                                message.lastWatered = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 7: {
                                if (!(message.currentStatistics && message.currentStatistics.length))
                                    message.currentStatistics = [];
                                message.currentStatistics.push($root.plantos.admin.v1.Statistic.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Zone message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.Zone} Zone
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Zone.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Zone message.
                 * @function verify
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Zone.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        if (!$util.isInteger(message.moduleId))
                            return "moduleId: integer expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.icon != null && message.hasOwnProperty("icon"))
                        if (!$util.isString(message.icon))
                            return "icon: string expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.lastWatered != null && message.hasOwnProperty("lastWatered")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.lastWatered);
                        if (error)
                            return "lastWatered." + error;
                    }
                    if (message.currentStatistics != null && message.hasOwnProperty("currentStatistics")) {
                        if (!Array.isArray(message.currentStatistics))
                            return "currentStatistics: array expected";
                        for (var i = 0; i < message.currentStatistics.length; ++i) {
                            var error = $root.plantos.admin.v1.Statistic.verify(message.currentStatistics[i]);
                            if (error)
                                return "currentStatistics." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Zone message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.Zone} Zone
                 */
                Zone.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.Zone)
                        return object;
                    var message = new $root.plantos.admin.v1.Zone();
                    if (object.id != null)
                        message.id = object.id | 0;
                    if (object.moduleId != null)
                        message.moduleId = object.moduleId | 0;
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.icon != null)
                        message.icon = String(object.icon);
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "STATUS_UNSPECIFIED":
                    case 0:
                        message.status = 0;
                        break;
                    case "STATUS_IDLE":
                    case 1:
                        message.status = 1;
                        break;
                    case "STATUS_WORKING":
                    case 2:
                        message.status = 2;
                        break;
                    case "STATUS_PAUSED":
                    case 3:
                        message.status = 3;
                        break;
                    case "STATUS_ERROR":
                    case 4:
                        message.status = 4;
                        break;
                    case "STATUS_OFFLINE":
                    case 5:
                        message.status = 5;
                        break;
                    }
                    if (object.lastWatered != null) {
                        if (typeof object.lastWatered !== "object")
                            throw TypeError(".plantos.admin.v1.Zone.lastWatered: object expected");
                        message.lastWatered = $root.google.protobuf.Timestamp.fromObject(object.lastWatered);
                    }
                    if (object.currentStatistics) {
                        if (!Array.isArray(object.currentStatistics))
                            throw TypeError(".plantos.admin.v1.Zone.currentStatistics: array expected");
                        message.currentStatistics = [];
                        for (var i = 0; i < object.currentStatistics.length; ++i) {
                            if (typeof object.currentStatistics[i] !== "object")
                                throw TypeError(".plantos.admin.v1.Zone.currentStatistics: object expected");
                            message.currentStatistics[i] = $root.plantos.admin.v1.Statistic.fromObject(object.currentStatistics[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Zone message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {plantos.admin.v1.Zone} message Zone
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Zone.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.currentStatistics = [];
                    if (options.defaults) {
                        object.id = 0;
                        object.moduleId = 0;
                        object.name = "";
                        object.icon = "";
                        object.status = options.enums === String ? "STATUS_UNSPECIFIED" : 0;
                        object.lastWatered = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        object.moduleId = message.moduleId;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.icon != null && message.hasOwnProperty("icon"))
                        object.icon = message.icon;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.enums === String ? $root.plantos.admin.v1.Status[message.status] === undefined ? message.status : $root.plantos.admin.v1.Status[message.status] : message.status;
                    if (message.lastWatered != null && message.hasOwnProperty("lastWatered"))
                        object.lastWatered = $root.google.protobuf.Timestamp.toObject(message.lastWatered, options);
                    if (message.currentStatistics && message.currentStatistics.length) {
                        object.currentStatistics = [];
                        for (var j = 0; j < message.currentStatistics.length; ++j)
                            object.currentStatistics[j] = $root.plantos.admin.v1.Statistic.toObject(message.currentStatistics[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Zone to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.Zone
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Zone.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Zone
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.Zone
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Zone.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.Zone";
                };

                return Zone;
            })();

            v1.Module = (function() {

                /**
                 * Properties of a Module.
                 * @memberof plantos.admin.v1
                 * @interface IModule
                 * @property {number|null} [id] Module id
                 * @property {string|null} [name] Module name
                 * @property {plantos.admin.v1.Status|null} [status] Module status
                 * @property {number|null} [batteryLevel] Module batteryLevel
                 * @property {Array.<number>|null} [zoneIds] Module zoneIds
                 * @property {google.protobuf.ITimestamp|null} [lastSeen] Module lastSeen
                 */

                /**
                 * Constructs a new Module.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a Module.
                 * @implements IModule
                 * @constructor
                 * @param {plantos.admin.v1.IModule=} [properties] Properties to set
                 */
                function Module(properties) {
                    this.zoneIds = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Module id.
                 * @member {number} id
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.id = 0;

                /**
                 * Module name.
                 * @member {string} name
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.name = "";

                /**
                 * Module status.
                 * @member {plantos.admin.v1.Status} status
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.status = 0;

                /**
                 * Module batteryLevel.
                 * @member {number} batteryLevel
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.batteryLevel = 0;

                /**
                 * Module zoneIds.
                 * @member {Array.<number>} zoneIds
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.zoneIds = $util.emptyArray;

                /**
                 * Module lastSeen.
                 * @member {google.protobuf.ITimestamp|null|undefined} lastSeen
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 */
                Module.prototype.lastSeen = null;

                /**
                 * Creates a new Module instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {plantos.admin.v1.IModule=} [properties] Properties to set
                 * @returns {plantos.admin.v1.Module} Module instance
                 */
                Module.create = function create(properties) {
                    return new Module(properties);
                };

                /**
                 * Encodes the specified Module message. Does not implicitly {@link plantos.admin.v1.Module.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {plantos.admin.v1.IModule} message Module message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Module.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                    if (message.batteryLevel != null && Object.hasOwnProperty.call(message, "batteryLevel"))
                        writer.uint32(/* id 4, wireType 5 =*/37).float(message.batteryLevel);
                    if (message.zoneIds != null && message.zoneIds.length) {
                        writer.uint32(/* id 5, wireType 2 =*/42).fork();
                        for (var i = 0; i < message.zoneIds.length; ++i)
                            writer.int32(message.zoneIds[i]);
                        writer.ldelim();
                    }
                    if (message.lastSeen != null && Object.hasOwnProperty.call(message, "lastSeen"))
                        $root.google.protobuf.Timestamp.encode(message.lastSeen, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Module message, length delimited. Does not implicitly {@link plantos.admin.v1.Module.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {plantos.admin.v1.IModule} message Module message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Module.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Module message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.Module} Module
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Module.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.Module();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.id = reader.int32();
                                break;
                            }
                        case 2: {
                                message.name = reader.string();
                                break;
                            }
                        case 3: {
                                message.status = reader.int32();
                                break;
                            }
                        case 4: {
                                message.batteryLevel = reader.float();
                                break;
                            }
                        case 5: {
                                if (!(message.zoneIds && message.zoneIds.length))
                                    message.zoneIds = [];
                                if ((tag & 7) === 2) {
                                    var end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.zoneIds.push(reader.int32());
                                } else
                                    message.zoneIds.push(reader.int32());
                                break;
                            }
                        case 6: {
                                message.lastSeen = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Module message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.Module} Module
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Module.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Module message.
                 * @function verify
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Module.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.id != null && message.hasOwnProperty("id"))
                        if (!$util.isInteger(message.id))
                            return "id: integer expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.batteryLevel != null && message.hasOwnProperty("batteryLevel"))
                        if (typeof message.batteryLevel !== "number")
                            return "batteryLevel: number expected";
                    if (message.zoneIds != null && message.hasOwnProperty("zoneIds")) {
                        if (!Array.isArray(message.zoneIds))
                            return "zoneIds: array expected";
                        for (var i = 0; i < message.zoneIds.length; ++i)
                            if (!$util.isInteger(message.zoneIds[i]))
                                return "zoneIds: integer[] expected";
                    }
                    if (message.lastSeen != null && message.hasOwnProperty("lastSeen")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.lastSeen);
                        if (error)
                            return "lastSeen." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Module message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.Module} Module
                 */
                Module.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.Module)
                        return object;
                    var message = new $root.plantos.admin.v1.Module();
                    if (object.id != null)
                        message.id = object.id | 0;
                    if (object.name != null)
                        message.name = String(object.name);
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "STATUS_UNSPECIFIED":
                    case 0:
                        message.status = 0;
                        break;
                    case "STATUS_IDLE":
                    case 1:
                        message.status = 1;
                        break;
                    case "STATUS_WORKING":
                    case 2:
                        message.status = 2;
                        break;
                    case "STATUS_PAUSED":
                    case 3:
                        message.status = 3;
                        break;
                    case "STATUS_ERROR":
                    case 4:
                        message.status = 4;
                        break;
                    case "STATUS_OFFLINE":
                    case 5:
                        message.status = 5;
                        break;
                    }
                    if (object.batteryLevel != null)
                        message.batteryLevel = Number(object.batteryLevel);
                    if (object.zoneIds) {
                        if (!Array.isArray(object.zoneIds))
                            throw TypeError(".plantos.admin.v1.Module.zoneIds: array expected");
                        message.zoneIds = [];
                        for (var i = 0; i < object.zoneIds.length; ++i)
                            message.zoneIds[i] = object.zoneIds[i] | 0;
                    }
                    if (object.lastSeen != null) {
                        if (typeof object.lastSeen !== "object")
                            throw TypeError(".plantos.admin.v1.Module.lastSeen: object expected");
                        message.lastSeen = $root.google.protobuf.Timestamp.fromObject(object.lastSeen);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Module message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {plantos.admin.v1.Module} message Module
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Module.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.zoneIds = [];
                    if (options.defaults) {
                        object.id = 0;
                        object.name = "";
                        object.status = options.enums === String ? "STATUS_UNSPECIFIED" : 0;
                        object.batteryLevel = 0;
                        object.lastSeen = null;
                    }
                    if (message.id != null && message.hasOwnProperty("id"))
                        object.id = message.id;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = options.enums === String ? $root.plantos.admin.v1.Status[message.status] === undefined ? message.status : $root.plantos.admin.v1.Status[message.status] : message.status;
                    if (message.batteryLevel != null && message.hasOwnProperty("batteryLevel"))
                        object.batteryLevel = options.json && !isFinite(message.batteryLevel) ? String(message.batteryLevel) : message.batteryLevel;
                    if (message.zoneIds && message.zoneIds.length) {
                        object.zoneIds = [];
                        for (var j = 0; j < message.zoneIds.length; ++j)
                            object.zoneIds[j] = message.zoneIds[j];
                    }
                    if (message.lastSeen != null && message.hasOwnProperty("lastSeen"))
                        object.lastSeen = $root.google.protobuf.Timestamp.toObject(message.lastSeen, options);
                    return object;
                };

                /**
                 * Converts this Module to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.Module
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Module.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Module
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.Module
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Module.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.Module";
                };

                return Module;
            })();

            v1.ZoneSettings = (function() {

                /**
                 * Properties of a ZoneSettings.
                 * @memberof plantos.admin.v1
                 * @interface IZoneSettings
                 * @property {number|null} [zoneId] ZoneSettings zoneId
                 * @property {plantos.admin.v1.ZoneSettings.IThresholds|null} [thresholds] ZoneSettings thresholds
                 * @property {boolean|null} [notifyOnError] ZoneSettings notifyOnError
                 * @property {boolean|null} [notifyOnLowBattery] ZoneSettings notifyOnLowBattery
                 */

                /**
                 * Constructs a new ZoneSettings.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ZoneSettings.
                 * @implements IZoneSettings
                 * @constructor
                 * @param {plantos.admin.v1.IZoneSettings=} [properties] Properties to set
                 */
                function ZoneSettings(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ZoneSettings zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @instance
                 */
                ZoneSettings.prototype.zoneId = 0;

                /**
                 * ZoneSettings thresholds.
                 * @member {plantos.admin.v1.ZoneSettings.IThresholds|null|undefined} thresholds
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @instance
                 */
                ZoneSettings.prototype.thresholds = null;

                /**
                 * ZoneSettings notifyOnError.
                 * @member {boolean} notifyOnError
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @instance
                 */
                ZoneSettings.prototype.notifyOnError = false;

                /**
                 * ZoneSettings notifyOnLowBattery.
                 * @member {boolean} notifyOnLowBattery
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @instance
                 */
                ZoneSettings.prototype.notifyOnLowBattery = false;

                /**
                 * Creates a new ZoneSettings instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {plantos.admin.v1.IZoneSettings=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ZoneSettings} ZoneSettings instance
                 */
                ZoneSettings.create = function create(properties) {
                    return new ZoneSettings(properties);
                };

                /**
                 * Encodes the specified ZoneSettings message. Does not implicitly {@link plantos.admin.v1.ZoneSettings.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {plantos.admin.v1.IZoneSettings} message ZoneSettings message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ZoneSettings.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.thresholds != null && Object.hasOwnProperty.call(message, "thresholds"))
                        $root.plantos.admin.v1.ZoneSettings.Thresholds.encode(message.thresholds, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.notifyOnError != null && Object.hasOwnProperty.call(message, "notifyOnError"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.notifyOnError);
                    if (message.notifyOnLowBattery != null && Object.hasOwnProperty.call(message, "notifyOnLowBattery"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.notifyOnLowBattery);
                    return writer;
                };

                /**
                 * Encodes the specified ZoneSettings message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneSettings.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {plantos.admin.v1.IZoneSettings} message ZoneSettings message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ZoneSettings.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ZoneSettings message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ZoneSettings} ZoneSettings
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ZoneSettings.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ZoneSettings();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.thresholds = $root.plantos.admin.v1.ZoneSettings.Thresholds.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.notifyOnError = reader.bool();
                                break;
                            }
                        case 4: {
                                message.notifyOnLowBattery = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ZoneSettings message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ZoneSettings} ZoneSettings
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ZoneSettings.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ZoneSettings message.
                 * @function verify
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ZoneSettings.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.thresholds != null && message.hasOwnProperty("thresholds")) {
                        var error = $root.plantos.admin.v1.ZoneSettings.Thresholds.verify(message.thresholds);
                        if (error)
                            return "thresholds." + error;
                    }
                    if (message.notifyOnError != null && message.hasOwnProperty("notifyOnError"))
                        if (typeof message.notifyOnError !== "boolean")
                            return "notifyOnError: boolean expected";
                    if (message.notifyOnLowBattery != null && message.hasOwnProperty("notifyOnLowBattery"))
                        if (typeof message.notifyOnLowBattery !== "boolean")
                            return "notifyOnLowBattery: boolean expected";
                    return null;
                };

                /**
                 * Creates a ZoneSettings message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ZoneSettings} ZoneSettings
                 */
                ZoneSettings.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ZoneSettings)
                        return object;
                    var message = new $root.plantos.admin.v1.ZoneSettings();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.thresholds != null) {
                        if (typeof object.thresholds !== "object")
                            throw TypeError(".plantos.admin.v1.ZoneSettings.thresholds: object expected");
                        message.thresholds = $root.plantos.admin.v1.ZoneSettings.Thresholds.fromObject(object.thresholds);
                    }
                    if (object.notifyOnError != null)
                        message.notifyOnError = Boolean(object.notifyOnError);
                    if (object.notifyOnLowBattery != null)
                        message.notifyOnLowBattery = Boolean(object.notifyOnLowBattery);
                    return message;
                };

                /**
                 * Creates a plain object from a ZoneSettings message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {plantos.admin.v1.ZoneSettings} message ZoneSettings
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ZoneSettings.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.zoneId = 0;
                        object.thresholds = null;
                        object.notifyOnError = false;
                        object.notifyOnLowBattery = false;
                    }
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.thresholds != null && message.hasOwnProperty("thresholds"))
                        object.thresholds = $root.plantos.admin.v1.ZoneSettings.Thresholds.toObject(message.thresholds, options);
                    if (message.notifyOnError != null && message.hasOwnProperty("notifyOnError"))
                        object.notifyOnError = message.notifyOnError;
                    if (message.notifyOnLowBattery != null && message.hasOwnProperty("notifyOnLowBattery"))
                        object.notifyOnLowBattery = message.notifyOnLowBattery;
                    return object;
                };

                /**
                 * Converts this ZoneSettings to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ZoneSettings.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ZoneSettings
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ZoneSettings
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ZoneSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ZoneSettings";
                };

                ZoneSettings.Thresholds = (function() {

                    /**
                     * Properties of a Thresholds.
                     * @memberof plantos.admin.v1.ZoneSettings
                     * @interface IThresholds
                     * @property {number|null} [minTemperature] Thresholds minTemperature
                     * @property {number|null} [maxTemperature] Thresholds maxTemperature
                     * @property {number|null} [minSoilMoisture] Thresholds minSoilMoisture
                     * @property {number|null} [maxSoilMoisture] Thresholds maxSoilMoisture
                     */

                    /**
                     * Constructs a new Thresholds.
                     * @memberof plantos.admin.v1.ZoneSettings
                     * @classdesc Represents a Thresholds.
                     * @implements IThresholds
                     * @constructor
                     * @param {plantos.admin.v1.ZoneSettings.IThresholds=} [properties] Properties to set
                     */
                    function Thresholds(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Thresholds minTemperature.
                     * @member {number} minTemperature
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @instance
                     */
                    Thresholds.prototype.minTemperature = 0;

                    /**
                     * Thresholds maxTemperature.
                     * @member {number} maxTemperature
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @instance
                     */
                    Thresholds.prototype.maxTemperature = 0;

                    /**
                     * Thresholds minSoilMoisture.
                     * @member {number} minSoilMoisture
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @instance
                     */
                    Thresholds.prototype.minSoilMoisture = 0;

                    /**
                     * Thresholds maxSoilMoisture.
                     * @member {number} maxSoilMoisture
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @instance
                     */
                    Thresholds.prototype.maxSoilMoisture = 0;

                    /**
                     * Creates a new Thresholds instance using the specified properties.
                     * @function create
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {plantos.admin.v1.ZoneSettings.IThresholds=} [properties] Properties to set
                     * @returns {plantos.admin.v1.ZoneSettings.Thresholds} Thresholds instance
                     */
                    Thresholds.create = function create(properties) {
                        return new Thresholds(properties);
                    };

                    /**
                     * Encodes the specified Thresholds message. Does not implicitly {@link plantos.admin.v1.ZoneSettings.Thresholds.verify|verify} messages.
                     * @function encode
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {plantos.admin.v1.ZoneSettings.IThresholds} message Thresholds message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Thresholds.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.minTemperature != null && Object.hasOwnProperty.call(message, "minTemperature"))
                            writer.uint32(/* id 1, wireType 5 =*/13).float(message.minTemperature);
                        if (message.maxTemperature != null && Object.hasOwnProperty.call(message, "maxTemperature"))
                            writer.uint32(/* id 2, wireType 5 =*/21).float(message.maxTemperature);
                        if (message.minSoilMoisture != null && Object.hasOwnProperty.call(message, "minSoilMoisture"))
                            writer.uint32(/* id 3, wireType 5 =*/29).float(message.minSoilMoisture);
                        if (message.maxSoilMoisture != null && Object.hasOwnProperty.call(message, "maxSoilMoisture"))
                            writer.uint32(/* id 4, wireType 5 =*/37).float(message.maxSoilMoisture);
                        return writer;
                    };

                    /**
                     * Encodes the specified Thresholds message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneSettings.Thresholds.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {plantos.admin.v1.ZoneSettings.IThresholds} message Thresholds message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Thresholds.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Thresholds message from the specified reader or buffer.
                     * @function decode
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {plantos.admin.v1.ZoneSettings.Thresholds} Thresholds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Thresholds.decode = function decode(reader, length, error) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ZoneSettings.Thresholds();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.minTemperature = reader.float();
                                    break;
                                }
                            case 2: {
                                    message.maxTemperature = reader.float();
                                    break;
                                }
                            case 3: {
                                    message.minSoilMoisture = reader.float();
                                    break;
                                }
                            case 4: {
                                    message.maxSoilMoisture = reader.float();
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Thresholds message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {plantos.admin.v1.ZoneSettings.Thresholds} Thresholds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Thresholds.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Thresholds message.
                     * @function verify
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Thresholds.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.minTemperature != null && message.hasOwnProperty("minTemperature"))
                            if (typeof message.minTemperature !== "number")
                                return "minTemperature: number expected";
                        if (message.maxTemperature != null && message.hasOwnProperty("maxTemperature"))
                            if (typeof message.maxTemperature !== "number")
                                return "maxTemperature: number expected";
                        if (message.minSoilMoisture != null && message.hasOwnProperty("minSoilMoisture"))
                            if (typeof message.minSoilMoisture !== "number")
                                return "minSoilMoisture: number expected";
                        if (message.maxSoilMoisture != null && message.hasOwnProperty("maxSoilMoisture"))
                            if (typeof message.maxSoilMoisture !== "number")
                                return "maxSoilMoisture: number expected";
                        return null;
                    };

                    /**
                     * Creates a Thresholds message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {plantos.admin.v1.ZoneSettings.Thresholds} Thresholds
                     */
                    Thresholds.fromObject = function fromObject(object) {
                        if (object instanceof $root.plantos.admin.v1.ZoneSettings.Thresholds)
                            return object;
                        var message = new $root.plantos.admin.v1.ZoneSettings.Thresholds();
                        if (object.minTemperature != null)
                            message.minTemperature = Number(object.minTemperature);
                        if (object.maxTemperature != null)
                            message.maxTemperature = Number(object.maxTemperature);
                        if (object.minSoilMoisture != null)
                            message.minSoilMoisture = Number(object.minSoilMoisture);
                        if (object.maxSoilMoisture != null)
                            message.maxSoilMoisture = Number(object.maxSoilMoisture);
                        return message;
                    };

                    /**
                     * Creates a plain object from a Thresholds message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {plantos.admin.v1.ZoneSettings.Thresholds} message Thresholds
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Thresholds.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.minTemperature = 0;
                            object.maxTemperature = 0;
                            object.minSoilMoisture = 0;
                            object.maxSoilMoisture = 0;
                        }
                        if (message.minTemperature != null && message.hasOwnProperty("minTemperature"))
                            object.minTemperature = options.json && !isFinite(message.minTemperature) ? String(message.minTemperature) : message.minTemperature;
                        if (message.maxTemperature != null && message.hasOwnProperty("maxTemperature"))
                            object.maxTemperature = options.json && !isFinite(message.maxTemperature) ? String(message.maxTemperature) : message.maxTemperature;
                        if (message.minSoilMoisture != null && message.hasOwnProperty("minSoilMoisture"))
                            object.minSoilMoisture = options.json && !isFinite(message.minSoilMoisture) ? String(message.minSoilMoisture) : message.minSoilMoisture;
                        if (message.maxSoilMoisture != null && message.hasOwnProperty("maxSoilMoisture"))
                            object.maxSoilMoisture = options.json && !isFinite(message.maxSoilMoisture) ? String(message.maxSoilMoisture) : message.maxSoilMoisture;
                        return object;
                    };

                    /**
                     * Converts this Thresholds to JSON.
                     * @function toJSON
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Thresholds.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for Thresholds
                     * @function getTypeUrl
                     * @memberof plantos.admin.v1.ZoneSettings.Thresholds
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    Thresholds.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/plantos.admin.v1.ZoneSettings.Thresholds";
                    };

                    return Thresholds;
                })();

                return ZoneSettings;
            })();

            v1.Hello = (function() {

                /**
                 * Properties of a Hello.
                 * @memberof plantos.admin.v1
                 * @interface IHello
                 * @property {string|null} [protocolVersion] Hello protocolVersion
                 * @property {string|null} [clientVersion] Hello clientVersion
                 */

                /**
                 * Constructs a new Hello.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a Hello.
                 * @implements IHello
                 * @constructor
                 * @param {plantos.admin.v1.IHello=} [properties] Properties to set
                 */
                function Hello(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Hello protocolVersion.
                 * @member {string} protocolVersion
                 * @memberof plantos.admin.v1.Hello
                 * @instance
                 */
                Hello.prototype.protocolVersion = "";

                /**
                 * Hello clientVersion.
                 * @member {string} clientVersion
                 * @memberof plantos.admin.v1.Hello
                 * @instance
                 */
                Hello.prototype.clientVersion = "";

                /**
                 * Creates a new Hello instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {plantos.admin.v1.IHello=} [properties] Properties to set
                 * @returns {plantos.admin.v1.Hello} Hello instance
                 */
                Hello.create = function create(properties) {
                    return new Hello(properties);
                };

                /**
                 * Encodes the specified Hello message. Does not implicitly {@link plantos.admin.v1.Hello.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {plantos.admin.v1.IHello} message Hello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hello.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.protocolVersion);
                    if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientVersion);
                    return writer;
                };

                /**
                 * Encodes the specified Hello message, length delimited. Does not implicitly {@link plantos.admin.v1.Hello.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {plantos.admin.v1.IHello} message Hello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hello.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Hello message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.Hello} Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hello.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.Hello();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.protocolVersion = reader.string();
                                break;
                            }
                        case 2: {
                                message.clientVersion = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Hello message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.Hello} Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hello.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Hello message.
                 * @function verify
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Hello.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                        if (!$util.isString(message.protocolVersion))
                            return "protocolVersion: string expected";
                    if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                        if (!$util.isString(message.clientVersion))
                            return "clientVersion: string expected";
                    return null;
                };

                /**
                 * Creates a Hello message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.Hello} Hello
                 */
                Hello.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.Hello)
                        return object;
                    var message = new $root.plantos.admin.v1.Hello();
                    if (object.protocolVersion != null)
                        message.protocolVersion = String(object.protocolVersion);
                    if (object.clientVersion != null)
                        message.clientVersion = String(object.clientVersion);
                    return message;
                };

                /**
                 * Creates a plain object from a Hello message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {plantos.admin.v1.Hello} message Hello
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Hello.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.protocolVersion = "";
                        object.clientVersion = "";
                    }
                    if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                        object.protocolVersion = message.protocolVersion;
                    if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                        object.clientVersion = message.clientVersion;
                    return object;
                };

                /**
                 * Converts this Hello to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.Hello
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Hello.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Hello
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.Hello
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Hello.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.Hello";
                };

                return Hello;
            })();

            v1.Welcome = (function() {

                /**
                 * Properties of a Welcome.
                 * @memberof plantos.admin.v1
                 * @interface IWelcome
                 * @property {string|null} [hubId] Welcome hubId
                 * @property {string|null} [hubVersion] Welcome hubVersion
                 * @property {Long|null} [serverTimestamp] Welcome serverTimestamp
                 */

                /**
                 * Constructs a new Welcome.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a Welcome.
                 * @implements IWelcome
                 * @constructor
                 * @param {plantos.admin.v1.IWelcome=} [properties] Properties to set
                 */
                function Welcome(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Welcome hubId.
                 * @member {string} hubId
                 * @memberof plantos.admin.v1.Welcome
                 * @instance
                 */
                Welcome.prototype.hubId = "";

                /**
                 * Welcome hubVersion.
                 * @member {string} hubVersion
                 * @memberof plantos.admin.v1.Welcome
                 * @instance
                 */
                Welcome.prototype.hubVersion = "";

                /**
                 * Welcome serverTimestamp.
                 * @member {Long} serverTimestamp
                 * @memberof plantos.admin.v1.Welcome
                 * @instance
                 */
                Welcome.prototype.serverTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new Welcome instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {plantos.admin.v1.IWelcome=} [properties] Properties to set
                 * @returns {plantos.admin.v1.Welcome} Welcome instance
                 */
                Welcome.create = function create(properties) {
                    return new Welcome(properties);
                };

                /**
                 * Encodes the specified Welcome message. Does not implicitly {@link plantos.admin.v1.Welcome.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {plantos.admin.v1.IWelcome} message Welcome message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Welcome.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.hubId != null && Object.hasOwnProperty.call(message, "hubId"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.hubId);
                    if (message.hubVersion != null && Object.hasOwnProperty.call(message, "hubVersion"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.hubVersion);
                    if (message.serverTimestamp != null && Object.hasOwnProperty.call(message, "serverTimestamp"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int64(message.serverTimestamp);
                    return writer;
                };

                /**
                 * Encodes the specified Welcome message, length delimited. Does not implicitly {@link plantos.admin.v1.Welcome.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {plantos.admin.v1.IWelcome} message Welcome message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Welcome.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Welcome message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.Welcome} Welcome
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Welcome.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.Welcome();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.hubId = reader.string();
                                break;
                            }
                        case 2: {
                                message.hubVersion = reader.string();
                                break;
                            }
                        case 3: {
                                message.serverTimestamp = reader.int64();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Welcome message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.Welcome} Welcome
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Welcome.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Welcome message.
                 * @function verify
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Welcome.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.hubId != null && message.hasOwnProperty("hubId"))
                        if (!$util.isString(message.hubId))
                            return "hubId: string expected";
                    if (message.hubVersion != null && message.hasOwnProperty("hubVersion"))
                        if (!$util.isString(message.hubVersion))
                            return "hubVersion: string expected";
                    if (message.serverTimestamp != null && message.hasOwnProperty("serverTimestamp"))
                        if (!$util.isInteger(message.serverTimestamp) && !(message.serverTimestamp && $util.isInteger(message.serverTimestamp.low) && $util.isInteger(message.serverTimestamp.high)))
                            return "serverTimestamp: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a Welcome message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.Welcome} Welcome
                 */
                Welcome.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.Welcome)
                        return object;
                    var message = new $root.plantos.admin.v1.Welcome();
                    if (object.hubId != null)
                        message.hubId = String(object.hubId);
                    if (object.hubVersion != null)
                        message.hubVersion = String(object.hubVersion);
                    if (object.serverTimestamp != null)
                        if ($util.Long)
                            (message.serverTimestamp = $util.Long.fromValue(object.serverTimestamp)).unsigned = false;
                        else if (typeof object.serverTimestamp === "string")
                            message.serverTimestamp = parseInt(object.serverTimestamp, 10);
                        else if (typeof object.serverTimestamp === "number")
                            message.serverTimestamp = object.serverTimestamp;
                        else if (typeof object.serverTimestamp === "object")
                            message.serverTimestamp = new $util.LongBits(object.serverTimestamp.low >>> 0, object.serverTimestamp.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from a Welcome message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {plantos.admin.v1.Welcome} message Welcome
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Welcome.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.hubId = "";
                        object.hubVersion = "";
                        if ($util.Long) {
                            var long = new $util.Long(0, 0, false);
                            object.serverTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                        } else
                            object.serverTimestamp = options.longs === String ? "0" : 0;
                    }
                    if (message.hubId != null && message.hasOwnProperty("hubId"))
                        object.hubId = message.hubId;
                    if (message.hubVersion != null && message.hasOwnProperty("hubVersion"))
                        object.hubVersion = message.hubVersion;
                    if (message.serverTimestamp != null && message.hasOwnProperty("serverTimestamp"))
                        if (typeof message.serverTimestamp === "number")
                            object.serverTimestamp = options.longs === String ? String(message.serverTimestamp) : message.serverTimestamp;
                        else
                            object.serverTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.serverTimestamp) : options.longs === Number ? new $util.LongBits(message.serverTimestamp.low >>> 0, message.serverTimestamp.high >>> 0).toNumber() : message.serverTimestamp;
                    return object;
                };

                /**
                 * Converts this Welcome to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.Welcome
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Welcome.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Welcome
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.Welcome
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Welcome.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.Welcome";
                };

                return Welcome;
            })();

            v1.ListModulesRequest = (function() {

                /**
                 * Properties of a ListModulesRequest.
                 * @memberof plantos.admin.v1
                 * @interface IListModulesRequest
                 */

                /**
                 * Constructs a new ListModulesRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ListModulesRequest.
                 * @implements IListModulesRequest
                 * @constructor
                 * @param {plantos.admin.v1.IListModulesRequest=} [properties] Properties to set
                 */
                function ListModulesRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Creates a new ListModulesRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {plantos.admin.v1.IListModulesRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ListModulesRequest} ListModulesRequest instance
                 */
                ListModulesRequest.create = function create(properties) {
                    return new ListModulesRequest(properties);
                };

                /**
                 * Encodes the specified ListModulesRequest message. Does not implicitly {@link plantos.admin.v1.ListModulesRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {plantos.admin.v1.IListModulesRequest} message ListModulesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListModulesRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    return writer;
                };

                /**
                 * Encodes the specified ListModulesRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ListModulesRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {plantos.admin.v1.IListModulesRequest} message ListModulesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListModulesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ListModulesRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ListModulesRequest} ListModulesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListModulesRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ListModulesRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ListModulesRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ListModulesRequest} ListModulesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListModulesRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ListModulesRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ListModulesRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    return null;
                };

                /**
                 * Creates a ListModulesRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ListModulesRequest} ListModulesRequest
                 */
                ListModulesRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ListModulesRequest)
                        return object;
                    return new $root.plantos.admin.v1.ListModulesRequest();
                };

                /**
                 * Creates a plain object from a ListModulesRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {plantos.admin.v1.ListModulesRequest} message ListModulesRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ListModulesRequest.toObject = function toObject() {
                    return {};
                };

                /**
                 * Converts this ListModulesRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ListModulesRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ListModulesRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ListModulesRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ListModulesRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ListModulesRequest";
                };

                return ListModulesRequest;
            })();

            v1.ListModulesResponse = (function() {

                /**
                 * Properties of a ListModulesResponse.
                 * @memberof plantos.admin.v1
                 * @interface IListModulesResponse
                 * @property {Array.<plantos.admin.v1.IModule>|null} [modules] ListModulesResponse modules
                 */

                /**
                 * Constructs a new ListModulesResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ListModulesResponse.
                 * @implements IListModulesResponse
                 * @constructor
                 * @param {plantos.admin.v1.IListModulesResponse=} [properties] Properties to set
                 */
                function ListModulesResponse(properties) {
                    this.modules = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListModulesResponse modules.
                 * @member {Array.<plantos.admin.v1.IModule>} modules
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @instance
                 */
                ListModulesResponse.prototype.modules = $util.emptyArray;

                /**
                 * Creates a new ListModulesResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {plantos.admin.v1.IListModulesResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ListModulesResponse} ListModulesResponse instance
                 */
                ListModulesResponse.create = function create(properties) {
                    return new ListModulesResponse(properties);
                };

                /**
                 * Encodes the specified ListModulesResponse message. Does not implicitly {@link plantos.admin.v1.ListModulesResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {plantos.admin.v1.IListModulesResponse} message ListModulesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListModulesResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.modules != null && message.modules.length)
                        for (var i = 0; i < message.modules.length; ++i)
                            $root.plantos.admin.v1.Module.encode(message.modules[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ListModulesResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ListModulesResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {plantos.admin.v1.IListModulesResponse} message ListModulesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListModulesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ListModulesResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ListModulesResponse} ListModulesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListModulesResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ListModulesResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.modules && message.modules.length))
                                    message.modules = [];
                                message.modules.push($root.plantos.admin.v1.Module.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ListModulesResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ListModulesResponse} ListModulesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListModulesResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ListModulesResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ListModulesResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.modules != null && message.hasOwnProperty("modules")) {
                        if (!Array.isArray(message.modules))
                            return "modules: array expected";
                        for (var i = 0; i < message.modules.length; ++i) {
                            var error = $root.plantos.admin.v1.Module.verify(message.modules[i]);
                            if (error)
                                return "modules." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ListModulesResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ListModulesResponse} ListModulesResponse
                 */
                ListModulesResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ListModulesResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.ListModulesResponse();
                    if (object.modules) {
                        if (!Array.isArray(object.modules))
                            throw TypeError(".plantos.admin.v1.ListModulesResponse.modules: array expected");
                        message.modules = [];
                        for (var i = 0; i < object.modules.length; ++i) {
                            if (typeof object.modules[i] !== "object")
                                throw TypeError(".plantos.admin.v1.ListModulesResponse.modules: object expected");
                            message.modules[i] = $root.plantos.admin.v1.Module.fromObject(object.modules[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ListModulesResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {plantos.admin.v1.ListModulesResponse} message ListModulesResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ListModulesResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.modules = [];
                    if (message.modules && message.modules.length) {
                        object.modules = [];
                        for (var j = 0; j < message.modules.length; ++j)
                            object.modules[j] = $root.plantos.admin.v1.Module.toObject(message.modules[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this ListModulesResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ListModulesResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ListModulesResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ListModulesResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ListModulesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ListModulesResponse";
                };

                return ListModulesResponse;
            })();

            v1.GetModuleRequest = (function() {

                /**
                 * Properties of a GetModuleRequest.
                 * @memberof plantos.admin.v1
                 * @interface IGetModuleRequest
                 * @property {number|null} [moduleId] GetModuleRequest moduleId
                 */

                /**
                 * Constructs a new GetModuleRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetModuleRequest.
                 * @implements IGetModuleRequest
                 * @constructor
                 * @param {plantos.admin.v1.IGetModuleRequest=} [properties] Properties to set
                 */
                function GetModuleRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetModuleRequest moduleId.
                 * @member {number} moduleId
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @instance
                 */
                GetModuleRequest.prototype.moduleId = 0;

                /**
                 * Creates a new GetModuleRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {plantos.admin.v1.IGetModuleRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetModuleRequest} GetModuleRequest instance
                 */
                GetModuleRequest.create = function create(properties) {
                    return new GetModuleRequest(properties);
                };

                /**
                 * Encodes the specified GetModuleRequest message. Does not implicitly {@link plantos.admin.v1.GetModuleRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {plantos.admin.v1.IGetModuleRequest} message GetModuleRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetModuleRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.moduleId != null && Object.hasOwnProperty.call(message, "moduleId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.moduleId);
                    return writer;
                };

                /**
                 * Encodes the specified GetModuleRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetModuleRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {plantos.admin.v1.IGetModuleRequest} message GetModuleRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetModuleRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetModuleRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetModuleRequest} GetModuleRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetModuleRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetModuleRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.moduleId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetModuleRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetModuleRequest} GetModuleRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetModuleRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetModuleRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetModuleRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        if (!$util.isInteger(message.moduleId))
                            return "moduleId: integer expected";
                    return null;
                };

                /**
                 * Creates a GetModuleRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetModuleRequest} GetModuleRequest
                 */
                GetModuleRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetModuleRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.GetModuleRequest();
                    if (object.moduleId != null)
                        message.moduleId = object.moduleId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GetModuleRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {plantos.admin.v1.GetModuleRequest} message GetModuleRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetModuleRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.moduleId = 0;
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        object.moduleId = message.moduleId;
                    return object;
                };

                /**
                 * Converts this GetModuleRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetModuleRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetModuleRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetModuleRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetModuleRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetModuleRequest";
                };

                return GetModuleRequest;
            })();

            v1.GetModuleResponse = (function() {

                /**
                 * Properties of a GetModuleResponse.
                 * @memberof plantos.admin.v1
                 * @interface IGetModuleResponse
                 * @property {plantos.admin.v1.IModule|null} [module] GetModuleResponse module
                 */

                /**
                 * Constructs a new GetModuleResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetModuleResponse.
                 * @implements IGetModuleResponse
                 * @constructor
                 * @param {plantos.admin.v1.IGetModuleResponse=} [properties] Properties to set
                 */
                function GetModuleResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetModuleResponse module.
                 * @member {plantos.admin.v1.IModule|null|undefined} module
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @instance
                 */
                GetModuleResponse.prototype.module = null;

                /**
                 * Creates a new GetModuleResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {plantos.admin.v1.IGetModuleResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetModuleResponse} GetModuleResponse instance
                 */
                GetModuleResponse.create = function create(properties) {
                    return new GetModuleResponse(properties);
                };

                /**
                 * Encodes the specified GetModuleResponse message. Does not implicitly {@link plantos.admin.v1.GetModuleResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {plantos.admin.v1.IGetModuleResponse} message GetModuleResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetModuleResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                        $root.plantos.admin.v1.Module.encode(message.module, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetModuleResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetModuleResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {plantos.admin.v1.IGetModuleResponse} message GetModuleResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetModuleResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetModuleResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetModuleResponse} GetModuleResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetModuleResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetModuleResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.module = $root.plantos.admin.v1.Module.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetModuleResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetModuleResponse} GetModuleResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetModuleResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetModuleResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetModuleResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.module != null && message.hasOwnProperty("module")) {
                        var error = $root.plantos.admin.v1.Module.verify(message.module);
                        if (error)
                            return "module." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetModuleResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetModuleResponse} GetModuleResponse
                 */
                GetModuleResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetModuleResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.GetModuleResponse();
                    if (object.module != null) {
                        if (typeof object.module !== "object")
                            throw TypeError(".plantos.admin.v1.GetModuleResponse.module: object expected");
                        message.module = $root.plantos.admin.v1.Module.fromObject(object.module);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetModuleResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {plantos.admin.v1.GetModuleResponse} message GetModuleResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetModuleResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.module = null;
                    if (message.module != null && message.hasOwnProperty("module"))
                        object.module = $root.plantos.admin.v1.Module.toObject(message.module, options);
                    return object;
                };

                /**
                 * Converts this GetModuleResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetModuleResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetModuleResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetModuleResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetModuleResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetModuleResponse";
                };

                return GetModuleResponse;
            })();

            v1.ListZonesRequest = (function() {

                /**
                 * Properties of a ListZonesRequest.
                 * @memberof plantos.admin.v1
                 * @interface IListZonesRequest
                 * @property {number|null} [moduleId] ListZonesRequest moduleId
                 */

                /**
                 * Constructs a new ListZonesRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ListZonesRequest.
                 * @implements IListZonesRequest
                 * @constructor
                 * @param {plantos.admin.v1.IListZonesRequest=} [properties] Properties to set
                 */
                function ListZonesRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListZonesRequest moduleId.
                 * @member {number|null|undefined} moduleId
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @instance
                 */
                ListZonesRequest.prototype.moduleId = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(ListZonesRequest.prototype, "_moduleId", {
                    get: $util.oneOfGetter($oneOfFields = ["moduleId"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ListZonesRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {plantos.admin.v1.IListZonesRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ListZonesRequest} ListZonesRequest instance
                 */
                ListZonesRequest.create = function create(properties) {
                    return new ListZonesRequest(properties);
                };

                /**
                 * Encodes the specified ListZonesRequest message. Does not implicitly {@link plantos.admin.v1.ListZonesRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {plantos.admin.v1.IListZonesRequest} message ListZonesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListZonesRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.moduleId != null && Object.hasOwnProperty.call(message, "moduleId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.moduleId);
                    return writer;
                };

                /**
                 * Encodes the specified ListZonesRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ListZonesRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {plantos.admin.v1.IListZonesRequest} message ListZonesRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListZonesRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ListZonesRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ListZonesRequest} ListZonesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListZonesRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ListZonesRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.moduleId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ListZonesRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ListZonesRequest} ListZonesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListZonesRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ListZonesRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ListZonesRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.moduleId != null && message.hasOwnProperty("moduleId")) {
                        properties._moduleId = 1;
                        if (!$util.isInteger(message.moduleId))
                            return "moduleId: integer expected";
                    }
                    return null;
                };

                /**
                 * Creates a ListZonesRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ListZonesRequest} ListZonesRequest
                 */
                ListZonesRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ListZonesRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.ListZonesRequest();
                    if (object.moduleId != null)
                        message.moduleId = object.moduleId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ListZonesRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {plantos.admin.v1.ListZonesRequest} message ListZonesRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ListZonesRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (message.moduleId != null && message.hasOwnProperty("moduleId")) {
                        object.moduleId = message.moduleId;
                        if (options.oneofs)
                            object._moduleId = "moduleId";
                    }
                    return object;
                };

                /**
                 * Converts this ListZonesRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ListZonesRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ListZonesRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ListZonesRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ListZonesRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ListZonesRequest";
                };

                return ListZonesRequest;
            })();

            v1.ListZonesResponse = (function() {

                /**
                 * Properties of a ListZonesResponse.
                 * @memberof plantos.admin.v1
                 * @interface IListZonesResponse
                 * @property {Array.<plantos.admin.v1.IZone>|null} [zones] ListZonesResponse zones
                 */

                /**
                 * Constructs a new ListZonesResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ListZonesResponse.
                 * @implements IListZonesResponse
                 * @constructor
                 * @param {plantos.admin.v1.IListZonesResponse=} [properties] Properties to set
                 */
                function ListZonesResponse(properties) {
                    this.zones = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ListZonesResponse zones.
                 * @member {Array.<plantos.admin.v1.IZone>} zones
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @instance
                 */
                ListZonesResponse.prototype.zones = $util.emptyArray;

                /**
                 * Creates a new ListZonesResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {plantos.admin.v1.IListZonesResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ListZonesResponse} ListZonesResponse instance
                 */
                ListZonesResponse.create = function create(properties) {
                    return new ListZonesResponse(properties);
                };

                /**
                 * Encodes the specified ListZonesResponse message. Does not implicitly {@link plantos.admin.v1.ListZonesResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {plantos.admin.v1.IListZonesResponse} message ListZonesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListZonesResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zones != null && message.zones.length)
                        for (var i = 0; i < message.zones.length; ++i)
                            $root.plantos.admin.v1.Zone.encode(message.zones[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ListZonesResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ListZonesResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {plantos.admin.v1.IListZonesResponse} message ListZonesResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ListZonesResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ListZonesResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ListZonesResponse} ListZonesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListZonesResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ListZonesResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.zones && message.zones.length))
                                    message.zones = [];
                                message.zones.push($root.plantos.admin.v1.Zone.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ListZonesResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ListZonesResponse} ListZonesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ListZonesResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ListZonesResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ListZonesResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zones != null && message.hasOwnProperty("zones")) {
                        if (!Array.isArray(message.zones))
                            return "zones: array expected";
                        for (var i = 0; i < message.zones.length; ++i) {
                            var error = $root.plantos.admin.v1.Zone.verify(message.zones[i]);
                            if (error)
                                return "zones." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ListZonesResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ListZonesResponse} ListZonesResponse
                 */
                ListZonesResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ListZonesResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.ListZonesResponse();
                    if (object.zones) {
                        if (!Array.isArray(object.zones))
                            throw TypeError(".plantos.admin.v1.ListZonesResponse.zones: array expected");
                        message.zones = [];
                        for (var i = 0; i < object.zones.length; ++i) {
                            if (typeof object.zones[i] !== "object")
                                throw TypeError(".plantos.admin.v1.ListZonesResponse.zones: object expected");
                            message.zones[i] = $root.plantos.admin.v1.Zone.fromObject(object.zones[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ListZonesResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {plantos.admin.v1.ListZonesResponse} message ListZonesResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ListZonesResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.zones = [];
                    if (message.zones && message.zones.length) {
                        object.zones = [];
                        for (var j = 0; j < message.zones.length; ++j)
                            object.zones[j] = $root.plantos.admin.v1.Zone.toObject(message.zones[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this ListZonesResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ListZonesResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ListZonesResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ListZonesResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ListZonesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ListZonesResponse";
                };

                return ListZonesResponse;
            })();

            v1.GetZoneRequest = (function() {

                /**
                 * Properties of a GetZoneRequest.
                 * @memberof plantos.admin.v1
                 * @interface IGetZoneRequest
                 * @property {number|null} [zoneId] GetZoneRequest zoneId
                 */

                /**
                 * Constructs a new GetZoneRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetZoneRequest.
                 * @implements IGetZoneRequest
                 * @constructor
                 * @param {plantos.admin.v1.IGetZoneRequest=} [properties] Properties to set
                 */
                function GetZoneRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetZoneRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @instance
                 */
                GetZoneRequest.prototype.zoneId = 0;

                /**
                 * Creates a new GetZoneRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetZoneRequest} GetZoneRequest instance
                 */
                GetZoneRequest.create = function create(properties) {
                    return new GetZoneRequest(properties);
                };

                /**
                 * Encodes the specified GetZoneRequest message. Does not implicitly {@link plantos.admin.v1.GetZoneRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneRequest} message GetZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    return writer;
                };

                /**
                 * Encodes the specified GetZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneRequest} message GetZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetZoneRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetZoneRequest} GetZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetZoneRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetZoneRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetZoneRequest} GetZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetZoneRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetZoneRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    return null;
                };

                /**
                 * Creates a GetZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetZoneRequest} GetZoneRequest
                 */
                GetZoneRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetZoneRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.GetZoneRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GetZoneRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {plantos.admin.v1.GetZoneRequest} message GetZoneRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetZoneRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    return object;
                };

                /**
                 * Converts this GetZoneRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetZoneRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetZoneRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetZoneRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetZoneRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetZoneRequest";
                };

                return GetZoneRequest;
            })();

            v1.GetZoneResponse = (function() {

                /**
                 * Properties of a GetZoneResponse.
                 * @memberof plantos.admin.v1
                 * @interface IGetZoneResponse
                 * @property {plantos.admin.v1.IZone|null} [zone] GetZoneResponse zone
                 */

                /**
                 * Constructs a new GetZoneResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetZoneResponse.
                 * @implements IGetZoneResponse
                 * @constructor
                 * @param {plantos.admin.v1.IGetZoneResponse=} [properties] Properties to set
                 */
                function GetZoneResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetZoneResponse zone.
                 * @member {plantos.admin.v1.IZone|null|undefined} zone
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @instance
                 */
                GetZoneResponse.prototype.zone = null;

                /**
                 * Creates a new GetZoneResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetZoneResponse} GetZoneResponse instance
                 */
                GetZoneResponse.create = function create(properties) {
                    return new GetZoneResponse(properties);
                };

                /**
                 * Encodes the specified GetZoneResponse message. Does not implicitly {@link plantos.admin.v1.GetZoneResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneResponse} message GetZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zone != null && Object.hasOwnProperty.call(message, "zone"))
                        $root.plantos.admin.v1.Zone.encode(message.zone, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneResponse} message GetZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetZoneResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetZoneResponse} GetZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetZoneResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zone = $root.plantos.admin.v1.Zone.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetZoneResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetZoneResponse} GetZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetZoneResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetZoneResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zone != null && message.hasOwnProperty("zone")) {
                        var error = $root.plantos.admin.v1.Zone.verify(message.zone);
                        if (error)
                            return "zone." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetZoneResponse} GetZoneResponse
                 */
                GetZoneResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetZoneResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.GetZoneResponse();
                    if (object.zone != null) {
                        if (typeof object.zone !== "object")
                            throw TypeError(".plantos.admin.v1.GetZoneResponse.zone: object expected");
                        message.zone = $root.plantos.admin.v1.Zone.fromObject(object.zone);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetZoneResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {plantos.admin.v1.GetZoneResponse} message GetZoneResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetZoneResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zone = null;
                    if (message.zone != null && message.hasOwnProperty("zone"))
                        object.zone = $root.plantos.admin.v1.Zone.toObject(message.zone, options);
                    return object;
                };

                /**
                 * Converts this GetZoneResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetZoneResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetZoneResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetZoneResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetZoneResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetZoneResponse";
                };

                return GetZoneResponse;
            })();

            v1.GetStatisticsRequest = (function() {

                /**
                 * Properties of a GetStatisticsRequest.
                 * @memberof plantos.admin.v1
                 * @interface IGetStatisticsRequest
                 * @property {number|null} [zoneId] GetStatisticsRequest zoneId
                 * @property {google.protobuf.ITimestamp|null} [from] GetStatisticsRequest from
                 * @property {google.protobuf.ITimestamp|null} [to] GetStatisticsRequest to
                 * @property {Array.<plantos.admin.v1.StatisticType>|null} [types] GetStatisticsRequest types
                 * @property {plantos.admin.v1.GetStatisticsRequest.Aggregation|null} [aggregation] GetStatisticsRequest aggregation
                 */

                /**
                 * Constructs a new GetStatisticsRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetStatisticsRequest.
                 * @implements IGetStatisticsRequest
                 * @constructor
                 * @param {plantos.admin.v1.IGetStatisticsRequest=} [properties] Properties to set
                 */
                function GetStatisticsRequest(properties) {
                    this.types = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetStatisticsRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 */
                GetStatisticsRequest.prototype.zoneId = 0;

                /**
                 * GetStatisticsRequest from.
                 * @member {google.protobuf.ITimestamp|null|undefined} from
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 */
                GetStatisticsRequest.prototype.from = null;

                /**
                 * GetStatisticsRequest to.
                 * @member {google.protobuf.ITimestamp|null|undefined} to
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 */
                GetStatisticsRequest.prototype.to = null;

                /**
                 * GetStatisticsRequest types.
                 * @member {Array.<plantos.admin.v1.StatisticType>} types
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 */
                GetStatisticsRequest.prototype.types = $util.emptyArray;

                /**
                 * GetStatisticsRequest aggregation.
                 * @member {plantos.admin.v1.GetStatisticsRequest.Aggregation} aggregation
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 */
                GetStatisticsRequest.prototype.aggregation = 0;

                /**
                 * Creates a new GetStatisticsRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetStatisticsRequest} GetStatisticsRequest instance
                 */
                GetStatisticsRequest.create = function create(properties) {
                    return new GetStatisticsRequest(properties);
                };

                /**
                 * Encodes the specified GetStatisticsRequest message. Does not implicitly {@link plantos.admin.v1.GetStatisticsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsRequest} message GetStatisticsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetStatisticsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                        $root.google.protobuf.Timestamp.encode(message.from, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                        $root.google.protobuf.Timestamp.encode(message.to, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    if (message.types != null && message.types.length) {
                        writer.uint32(/* id 4, wireType 2 =*/34).fork();
                        for (var i = 0; i < message.types.length; ++i)
                            writer.int32(message.types[i]);
                        writer.ldelim();
                    }
                    if (message.aggregation != null && Object.hasOwnProperty.call(message, "aggregation"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int32(message.aggregation);
                    return writer;
                };

                /**
                 * Encodes the specified GetStatisticsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetStatisticsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsRequest} message GetStatisticsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetStatisticsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetStatisticsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetStatisticsRequest} GetStatisticsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetStatisticsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetStatisticsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.from = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.to = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 4: {
                                if (!(message.types && message.types.length))
                                    message.types = [];
                                if ((tag & 7) === 2) {
                                    var end2 = reader.uint32() + reader.pos;
                                    while (reader.pos < end2)
                                        message.types.push(reader.int32());
                                } else
                                    message.types.push(reader.int32());
                                break;
                            }
                        case 5: {
                                message.aggregation = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetStatisticsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetStatisticsRequest} GetStatisticsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetStatisticsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetStatisticsRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetStatisticsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.from != null && message.hasOwnProperty("from")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.from);
                        if (error)
                            return "from." + error;
                    }
                    if (message.to != null && message.hasOwnProperty("to")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.to);
                        if (error)
                            return "to." + error;
                    }
                    if (message.types != null && message.hasOwnProperty("types")) {
                        if (!Array.isArray(message.types))
                            return "types: array expected";
                        for (var i = 0; i < message.types.length; ++i)
                            switch (message.types[i]) {
                            default:
                                return "types: enum value[] expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                break;
                            }
                    }
                    if (message.aggregation != null && message.hasOwnProperty("aggregation"))
                        switch (message.aggregation) {
                        default:
                            return "aggregation: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a GetStatisticsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetStatisticsRequest} GetStatisticsRequest
                 */
                GetStatisticsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetStatisticsRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.GetStatisticsRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.from != null) {
                        if (typeof object.from !== "object")
                            throw TypeError(".plantos.admin.v1.GetStatisticsRequest.from: object expected");
                        message.from = $root.google.protobuf.Timestamp.fromObject(object.from);
                    }
                    if (object.to != null) {
                        if (typeof object.to !== "object")
                            throw TypeError(".plantos.admin.v1.GetStatisticsRequest.to: object expected");
                        message.to = $root.google.protobuf.Timestamp.fromObject(object.to);
                    }
                    if (object.types) {
                        if (!Array.isArray(object.types))
                            throw TypeError(".plantos.admin.v1.GetStatisticsRequest.types: array expected");
                        message.types = [];
                        for (var i = 0; i < object.types.length; ++i)
                            switch (object.types[i]) {
                            default:
                                if (typeof object.types[i] === "number") {
                                    message.types[i] = object.types[i];
                                    break;
                                }
                            case "STATISTIC_TYPE_UNSPECIFIED":
                            case 0:
                                message.types[i] = 0;
                                break;
                            case "STATISTIC_TYPE_TEMPERATURE":
                            case 1:
                                message.types[i] = 1;
                                break;
                            case "STATISTIC_TYPE_HUMIDITY":
                            case 2:
                                message.types[i] = 2;
                                break;
                            case "STATISTIC_TYPE_LIGHT":
                            case 3:
                                message.types[i] = 3;
                                break;
                            case "STATISTIC_TYPE_SOIL_MOISTURE":
                            case 4:
                                message.types[i] = 4;
                                break;
                            case "STATISTIC_TYPE_BATTERY":
                            case 5:
                                message.types[i] = 5;
                                break;
                            }
                    }
                    switch (object.aggregation) {
                    default:
                        if (typeof object.aggregation === "number") {
                            message.aggregation = object.aggregation;
                            break;
                        }
                        break;
                    case "AGGREGATION_NONE":
                    case 0:
                        message.aggregation = 0;
                        break;
                    case "AGGREGATION_HOURLY":
                    case 1:
                        message.aggregation = 1;
                        break;
                    case "AGGREGATION_DAILY":
                    case 2:
                        message.aggregation = 2;
                        break;
                    case "AGGREGATION_WEEKLY":
                    case 3:
                        message.aggregation = 3;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetStatisticsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {plantos.admin.v1.GetStatisticsRequest} message GetStatisticsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetStatisticsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.types = [];
                    if (options.defaults) {
                        object.zoneId = 0;
                        object.from = null;
                        object.to = null;
                        object.aggregation = options.enums === String ? "AGGREGATION_NONE" : 0;
                    }
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.from != null && message.hasOwnProperty("from"))
                        object.from = $root.google.protobuf.Timestamp.toObject(message.from, options);
                    if (message.to != null && message.hasOwnProperty("to"))
                        object.to = $root.google.protobuf.Timestamp.toObject(message.to, options);
                    if (message.types && message.types.length) {
                        object.types = [];
                        for (var j = 0; j < message.types.length; ++j)
                            object.types[j] = options.enums === String ? $root.plantos.admin.v1.StatisticType[message.types[j]] === undefined ? message.types[j] : $root.plantos.admin.v1.StatisticType[message.types[j]] : message.types[j];
                    }
                    if (message.aggregation != null && message.hasOwnProperty("aggregation"))
                        object.aggregation = options.enums === String ? $root.plantos.admin.v1.GetStatisticsRequest.Aggregation[message.aggregation] === undefined ? message.aggregation : $root.plantos.admin.v1.GetStatisticsRequest.Aggregation[message.aggregation] : message.aggregation;
                    return object;
                };

                /**
                 * Converts this GetStatisticsRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetStatisticsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetStatisticsRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetStatisticsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetStatisticsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetStatisticsRequest";
                };

                /**
                 * Aggregation enum.
                 * @name plantos.admin.v1.GetStatisticsRequest.Aggregation
                 * @enum {number}
                 * @property {number} AGGREGATION_NONE=0 AGGREGATION_NONE value
                 * @property {number} AGGREGATION_HOURLY=1 AGGREGATION_HOURLY value
                 * @property {number} AGGREGATION_DAILY=2 AGGREGATION_DAILY value
                 * @property {number} AGGREGATION_WEEKLY=3 AGGREGATION_WEEKLY value
                 */
                GetStatisticsRequest.Aggregation = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "AGGREGATION_NONE"] = 0;
                    values[valuesById[1] = "AGGREGATION_HOURLY"] = 1;
                    values[valuesById[2] = "AGGREGATION_DAILY"] = 2;
                    values[valuesById[3] = "AGGREGATION_WEEKLY"] = 3;
                    return values;
                })();

                return GetStatisticsRequest;
            })();

            v1.GetStatisticsResponse = (function() {

                /**
                 * Properties of a GetStatisticsResponse.
                 * @memberof plantos.admin.v1
                 * @interface IGetStatisticsResponse
                 * @property {number|null} [zoneId] GetStatisticsResponse zoneId
                 * @property {Array.<plantos.admin.v1.IStatistic>|null} [statistics] GetStatisticsResponse statistics
                 */

                /**
                 * Constructs a new GetStatisticsResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetStatisticsResponse.
                 * @implements IGetStatisticsResponse
                 * @constructor
                 * @param {plantos.admin.v1.IGetStatisticsResponse=} [properties] Properties to set
                 */
                function GetStatisticsResponse(properties) {
                    this.statistics = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetStatisticsResponse zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @instance
                 */
                GetStatisticsResponse.prototype.zoneId = 0;

                /**
                 * GetStatisticsResponse statistics.
                 * @member {Array.<plantos.admin.v1.IStatistic>} statistics
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @instance
                 */
                GetStatisticsResponse.prototype.statistics = $util.emptyArray;

                /**
                 * Creates a new GetStatisticsResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetStatisticsResponse} GetStatisticsResponse instance
                 */
                GetStatisticsResponse.create = function create(properties) {
                    return new GetStatisticsResponse(properties);
                };

                /**
                 * Encodes the specified GetStatisticsResponse message. Does not implicitly {@link plantos.admin.v1.GetStatisticsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsResponse} message GetStatisticsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetStatisticsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.statistics != null && message.statistics.length)
                        for (var i = 0; i < message.statistics.length; ++i)
                            $root.plantos.admin.v1.Statistic.encode(message.statistics[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetStatisticsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetStatisticsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetStatisticsResponse} message GetStatisticsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetStatisticsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetStatisticsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetStatisticsResponse} GetStatisticsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetStatisticsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetStatisticsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.statistics && message.statistics.length))
                                    message.statistics = [];
                                message.statistics.push($root.plantos.admin.v1.Statistic.decode(reader, reader.uint32()));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetStatisticsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetStatisticsResponse} GetStatisticsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetStatisticsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetStatisticsResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetStatisticsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.statistics != null && message.hasOwnProperty("statistics")) {
                        if (!Array.isArray(message.statistics))
                            return "statistics: array expected";
                        for (var i = 0; i < message.statistics.length; ++i) {
                            var error = $root.plantos.admin.v1.Statistic.verify(message.statistics[i]);
                            if (error)
                                return "statistics." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a GetStatisticsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetStatisticsResponse} GetStatisticsResponse
                 */
                GetStatisticsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetStatisticsResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.GetStatisticsResponse();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.statistics) {
                        if (!Array.isArray(object.statistics))
                            throw TypeError(".plantos.admin.v1.GetStatisticsResponse.statistics: array expected");
                        message.statistics = [];
                        for (var i = 0; i < object.statistics.length; ++i) {
                            if (typeof object.statistics[i] !== "object")
                                throw TypeError(".plantos.admin.v1.GetStatisticsResponse.statistics: object expected");
                            message.statistics[i] = $root.plantos.admin.v1.Statistic.fromObject(object.statistics[i]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetStatisticsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {plantos.admin.v1.GetStatisticsResponse} message GetStatisticsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetStatisticsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.statistics = [];
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.statistics && message.statistics.length) {
                        object.statistics = [];
                        for (var j = 0; j < message.statistics.length; ++j)
                            object.statistics[j] = $root.plantos.admin.v1.Statistic.toObject(message.statistics[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this GetStatisticsResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetStatisticsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetStatisticsResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetStatisticsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetStatisticsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetStatisticsResponse";
                };

                return GetStatisticsResponse;
            })();

            v1.WaterZoneRequest = (function() {

                /**
                 * Properties of a WaterZoneRequest.
                 * @memberof plantos.admin.v1
                 * @interface IWaterZoneRequest
                 * @property {number|null} [zoneId] WaterZoneRequest zoneId
                 * @property {google.protobuf.IDuration|null} [duration] WaterZoneRequest duration
                 */

                /**
                 * Constructs a new WaterZoneRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a WaterZoneRequest.
                 * @implements IWaterZoneRequest
                 * @constructor
                 * @param {plantos.admin.v1.IWaterZoneRequest=} [properties] Properties to set
                 */
                function WaterZoneRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WaterZoneRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @instance
                 */
                WaterZoneRequest.prototype.zoneId = 0;

                /**
                 * WaterZoneRequest duration.
                 * @member {google.protobuf.IDuration|null|undefined} duration
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @instance
                 */
                WaterZoneRequest.prototype.duration = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(WaterZoneRequest.prototype, "_duration", {
                    get: $util.oneOfGetter($oneOfFields = ["duration"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new WaterZoneRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.WaterZoneRequest} WaterZoneRequest instance
                 */
                WaterZoneRequest.create = function create(properties) {
                    return new WaterZoneRequest(properties);
                };

                /**
                 * Encodes the specified WaterZoneRequest message. Does not implicitly {@link plantos.admin.v1.WaterZoneRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneRequest} message WaterZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WaterZoneRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                        $root.google.protobuf.Duration.encode(message.duration, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified WaterZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.WaterZoneRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneRequest} message WaterZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WaterZoneRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WaterZoneRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.WaterZoneRequest} WaterZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WaterZoneRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.WaterZoneRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.duration = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WaterZoneRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.WaterZoneRequest} WaterZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WaterZoneRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WaterZoneRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WaterZoneRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        properties._duration = 1;
                        {
                            var error = $root.google.protobuf.Duration.verify(message.duration);
                            if (error)
                                return "duration." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a WaterZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.WaterZoneRequest} WaterZoneRequest
                 */
                WaterZoneRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.WaterZoneRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.WaterZoneRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.duration != null) {
                        if (typeof object.duration !== "object")
                            throw TypeError(".plantos.admin.v1.WaterZoneRequest.duration: object expected");
                        message.duration = $root.google.protobuf.Duration.fromObject(object.duration);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a WaterZoneRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {plantos.admin.v1.WaterZoneRequest} message WaterZoneRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WaterZoneRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        object.duration = $root.google.protobuf.Duration.toObject(message.duration, options);
                        if (options.oneofs)
                            object._duration = "duration";
                    }
                    return object;
                };

                /**
                 * Converts this WaterZoneRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WaterZoneRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WaterZoneRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.WaterZoneRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WaterZoneRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.WaterZoneRequest";
                };

                return WaterZoneRequest;
            })();

            v1.WaterZoneResponse = (function() {

                /**
                 * Properties of a WaterZoneResponse.
                 * @memberof plantos.admin.v1
                 * @interface IWaterZoneResponse
                 * @property {boolean|null} [success] WaterZoneResponse success
                 * @property {google.protobuf.ITimestamp|null} [startedAt] WaterZoneResponse startedAt
                 * @property {google.protobuf.IDuration|null} [duration] WaterZoneResponse duration
                 */

                /**
                 * Constructs a new WaterZoneResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a WaterZoneResponse.
                 * @implements IWaterZoneResponse
                 * @constructor
                 * @param {plantos.admin.v1.IWaterZoneResponse=} [properties] Properties to set
                 */
                function WaterZoneResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * WaterZoneResponse success.
                 * @member {boolean} success
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @instance
                 */
                WaterZoneResponse.prototype.success = false;

                /**
                 * WaterZoneResponse startedAt.
                 * @member {google.protobuf.ITimestamp|null|undefined} startedAt
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @instance
                 */
                WaterZoneResponse.prototype.startedAt = null;

                /**
                 * WaterZoneResponse duration.
                 * @member {google.protobuf.IDuration|null|undefined} duration
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @instance
                 */
                WaterZoneResponse.prototype.duration = null;

                /**
                 * Creates a new WaterZoneResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.WaterZoneResponse} WaterZoneResponse instance
                 */
                WaterZoneResponse.create = function create(properties) {
                    return new WaterZoneResponse(properties);
                };

                /**
                 * Encodes the specified WaterZoneResponse message. Does not implicitly {@link plantos.admin.v1.WaterZoneResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneResponse} message WaterZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WaterZoneResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                    if (message.startedAt != null && Object.hasOwnProperty.call(message, "startedAt"))
                        $root.google.protobuf.Timestamp.encode(message.startedAt, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                        $root.google.protobuf.Duration.encode(message.duration, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified WaterZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.WaterZoneResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IWaterZoneResponse} message WaterZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                WaterZoneResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a WaterZoneResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.WaterZoneResponse} WaterZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WaterZoneResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.WaterZoneResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.success = reader.bool();
                                break;
                            }
                        case 2: {
                                message.startedAt = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.duration = $root.google.protobuf.Duration.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a WaterZoneResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.WaterZoneResponse} WaterZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                WaterZoneResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a WaterZoneResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                WaterZoneResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.success != null && message.hasOwnProperty("success"))
                        if (typeof message.success !== "boolean")
                            return "success: boolean expected";
                    if (message.startedAt != null && message.hasOwnProperty("startedAt")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.startedAt);
                        if (error)
                            return "startedAt." + error;
                    }
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        var error = $root.google.protobuf.Duration.verify(message.duration);
                        if (error)
                            return "duration." + error;
                    }
                    return null;
                };

                /**
                 * Creates a WaterZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.WaterZoneResponse} WaterZoneResponse
                 */
                WaterZoneResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.WaterZoneResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.WaterZoneResponse();
                    if (object.success != null)
                        message.success = Boolean(object.success);
                    if (object.startedAt != null) {
                        if (typeof object.startedAt !== "object")
                            throw TypeError(".plantos.admin.v1.WaterZoneResponse.startedAt: object expected");
                        message.startedAt = $root.google.protobuf.Timestamp.fromObject(object.startedAt);
                    }
                    if (object.duration != null) {
                        if (typeof object.duration !== "object")
                            throw TypeError(".plantos.admin.v1.WaterZoneResponse.duration: object expected");
                        message.duration = $root.google.protobuf.Duration.fromObject(object.duration);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a WaterZoneResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {plantos.admin.v1.WaterZoneResponse} message WaterZoneResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                WaterZoneResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.success = false;
                        object.startedAt = null;
                        object.duration = null;
                    }
                    if (message.success != null && message.hasOwnProperty("success"))
                        object.success = message.success;
                    if (message.startedAt != null && message.hasOwnProperty("startedAt"))
                        object.startedAt = $root.google.protobuf.Timestamp.toObject(message.startedAt, options);
                    if (message.duration != null && message.hasOwnProperty("duration"))
                        object.duration = $root.google.protobuf.Duration.toObject(message.duration, options);
                    return object;
                };

                /**
                 * Converts this WaterZoneResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                WaterZoneResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for WaterZoneResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.WaterZoneResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                WaterZoneResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.WaterZoneResponse";
                };

                return WaterZoneResponse;
            })();

            v1.PauseZoneRequest = (function() {

                /**
                 * Properties of a PauseZoneRequest.
                 * @memberof plantos.admin.v1
                 * @interface IPauseZoneRequest
                 * @property {number|null} [zoneId] PauseZoneRequest zoneId
                 */

                /**
                 * Constructs a new PauseZoneRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a PauseZoneRequest.
                 * @implements IPauseZoneRequest
                 * @constructor
                 * @param {plantos.admin.v1.IPauseZoneRequest=} [properties] Properties to set
                 */
                function PauseZoneRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PauseZoneRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @instance
                 */
                PauseZoneRequest.prototype.zoneId = 0;

                /**
                 * Creates a new PauseZoneRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.PauseZoneRequest} PauseZoneRequest instance
                 */
                PauseZoneRequest.create = function create(properties) {
                    return new PauseZoneRequest(properties);
                };

                /**
                 * Encodes the specified PauseZoneRequest message. Does not implicitly {@link plantos.admin.v1.PauseZoneRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneRequest} message PauseZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PauseZoneRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    return writer;
                };

                /**
                 * Encodes the specified PauseZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.PauseZoneRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneRequest} message PauseZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PauseZoneRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PauseZoneRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.PauseZoneRequest} PauseZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PauseZoneRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.PauseZoneRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PauseZoneRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.PauseZoneRequest} PauseZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PauseZoneRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PauseZoneRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PauseZoneRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    return null;
                };

                /**
                 * Creates a PauseZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.PauseZoneRequest} PauseZoneRequest
                 */
                PauseZoneRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.PauseZoneRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.PauseZoneRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a PauseZoneRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {plantos.admin.v1.PauseZoneRequest} message PauseZoneRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PauseZoneRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    return object;
                };

                /**
                 * Converts this PauseZoneRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PauseZoneRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PauseZoneRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.PauseZoneRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PauseZoneRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.PauseZoneRequest";
                };

                return PauseZoneRequest;
            })();

            v1.PauseZoneResponse = (function() {

                /**
                 * Properties of a PauseZoneResponse.
                 * @memberof plantos.admin.v1
                 * @interface IPauseZoneResponse
                 * @property {boolean|null} [success] PauseZoneResponse success
                 * @property {plantos.admin.v1.Status|null} [previousStatus] PauseZoneResponse previousStatus
                 */

                /**
                 * Constructs a new PauseZoneResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a PauseZoneResponse.
                 * @implements IPauseZoneResponse
                 * @constructor
                 * @param {plantos.admin.v1.IPauseZoneResponse=} [properties] Properties to set
                 */
                function PauseZoneResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * PauseZoneResponse success.
                 * @member {boolean} success
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @instance
                 */
                PauseZoneResponse.prototype.success = false;

                /**
                 * PauseZoneResponse previousStatus.
                 * @member {plantos.admin.v1.Status} previousStatus
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @instance
                 */
                PauseZoneResponse.prototype.previousStatus = 0;

                /**
                 * Creates a new PauseZoneResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.PauseZoneResponse} PauseZoneResponse instance
                 */
                PauseZoneResponse.create = function create(properties) {
                    return new PauseZoneResponse(properties);
                };

                /**
                 * Encodes the specified PauseZoneResponse message. Does not implicitly {@link plantos.admin.v1.PauseZoneResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneResponse} message PauseZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PauseZoneResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                    if (message.previousStatus != null && Object.hasOwnProperty.call(message, "previousStatus"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.previousStatus);
                    return writer;
                };

                /**
                 * Encodes the specified PauseZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.PauseZoneResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IPauseZoneResponse} message PauseZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PauseZoneResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a PauseZoneResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.PauseZoneResponse} PauseZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PauseZoneResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.PauseZoneResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.success = reader.bool();
                                break;
                            }
                        case 2: {
                                message.previousStatus = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a PauseZoneResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.PauseZoneResponse} PauseZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PauseZoneResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a PauseZoneResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                PauseZoneResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.success != null && message.hasOwnProperty("success"))
                        if (typeof message.success !== "boolean")
                            return "success: boolean expected";
                    if (message.previousStatus != null && message.hasOwnProperty("previousStatus"))
                        switch (message.previousStatus) {
                        default:
                            return "previousStatus: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a PauseZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.PauseZoneResponse} PauseZoneResponse
                 */
                PauseZoneResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.PauseZoneResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.PauseZoneResponse();
                    if (object.success != null)
                        message.success = Boolean(object.success);
                    switch (object.previousStatus) {
                    default:
                        if (typeof object.previousStatus === "number") {
                            message.previousStatus = object.previousStatus;
                            break;
                        }
                        break;
                    case "STATUS_UNSPECIFIED":
                    case 0:
                        message.previousStatus = 0;
                        break;
                    case "STATUS_IDLE":
                    case 1:
                        message.previousStatus = 1;
                        break;
                    case "STATUS_WORKING":
                    case 2:
                        message.previousStatus = 2;
                        break;
                    case "STATUS_PAUSED":
                    case 3:
                        message.previousStatus = 3;
                        break;
                    case "STATUS_ERROR":
                    case 4:
                        message.previousStatus = 4;
                        break;
                    case "STATUS_OFFLINE":
                    case 5:
                        message.previousStatus = 5;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a PauseZoneResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {plantos.admin.v1.PauseZoneResponse} message PauseZoneResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PauseZoneResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.success = false;
                        object.previousStatus = options.enums === String ? "STATUS_UNSPECIFIED" : 0;
                    }
                    if (message.success != null && message.hasOwnProperty("success"))
                        object.success = message.success;
                    if (message.previousStatus != null && message.hasOwnProperty("previousStatus"))
                        object.previousStatus = options.enums === String ? $root.plantos.admin.v1.Status[message.previousStatus] === undefined ? message.previousStatus : $root.plantos.admin.v1.Status[message.previousStatus] : message.previousStatus;
                    return object;
                };

                /**
                 * Converts this PauseZoneResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PauseZoneResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PauseZoneResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.PauseZoneResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PauseZoneResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.PauseZoneResponse";
                };

                return PauseZoneResponse;
            })();

            v1.ResumeZoneRequest = (function() {

                /**
                 * Properties of a ResumeZoneRequest.
                 * @memberof plantos.admin.v1
                 * @interface IResumeZoneRequest
                 * @property {number|null} [zoneId] ResumeZoneRequest zoneId
                 */

                /**
                 * Constructs a new ResumeZoneRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ResumeZoneRequest.
                 * @implements IResumeZoneRequest
                 * @constructor
                 * @param {plantos.admin.v1.IResumeZoneRequest=} [properties] Properties to set
                 */
                function ResumeZoneRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ResumeZoneRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @instance
                 */
                ResumeZoneRequest.prototype.zoneId = 0;

                /**
                 * Creates a new ResumeZoneRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ResumeZoneRequest} ResumeZoneRequest instance
                 */
                ResumeZoneRequest.create = function create(properties) {
                    return new ResumeZoneRequest(properties);
                };

                /**
                 * Encodes the specified ResumeZoneRequest message. Does not implicitly {@link plantos.admin.v1.ResumeZoneRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneRequest} message ResumeZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResumeZoneRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    return writer;
                };

                /**
                 * Encodes the specified ResumeZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ResumeZoneRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneRequest} message ResumeZoneRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResumeZoneRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ResumeZoneRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ResumeZoneRequest} ResumeZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResumeZoneRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ResumeZoneRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ResumeZoneRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ResumeZoneRequest} ResumeZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResumeZoneRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ResumeZoneRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ResumeZoneRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    return null;
                };

                /**
                 * Creates a ResumeZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ResumeZoneRequest} ResumeZoneRequest
                 */
                ResumeZoneRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ResumeZoneRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.ResumeZoneRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ResumeZoneRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {plantos.admin.v1.ResumeZoneRequest} message ResumeZoneRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ResumeZoneRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    return object;
                };

                /**
                 * Converts this ResumeZoneRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ResumeZoneRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ResumeZoneRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ResumeZoneRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ResumeZoneRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ResumeZoneRequest";
                };

                return ResumeZoneRequest;
            })();

            v1.ResumeZoneResponse = (function() {

                /**
                 * Properties of a ResumeZoneResponse.
                 * @memberof plantos.admin.v1
                 * @interface IResumeZoneResponse
                 * @property {boolean|null} [success] ResumeZoneResponse success
                 */

                /**
                 * Constructs a new ResumeZoneResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ResumeZoneResponse.
                 * @implements IResumeZoneResponse
                 * @constructor
                 * @param {plantos.admin.v1.IResumeZoneResponse=} [properties] Properties to set
                 */
                function ResumeZoneResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ResumeZoneResponse success.
                 * @member {boolean} success
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @instance
                 */
                ResumeZoneResponse.prototype.success = false;

                /**
                 * Creates a new ResumeZoneResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ResumeZoneResponse} ResumeZoneResponse instance
                 */
                ResumeZoneResponse.create = function create(properties) {
                    return new ResumeZoneResponse(properties);
                };

                /**
                 * Encodes the specified ResumeZoneResponse message. Does not implicitly {@link plantos.admin.v1.ResumeZoneResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneResponse} message ResumeZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResumeZoneResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                    return writer;
                };

                /**
                 * Encodes the specified ResumeZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ResumeZoneResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {plantos.admin.v1.IResumeZoneResponse} message ResumeZoneResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResumeZoneResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ResumeZoneResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ResumeZoneResponse} ResumeZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResumeZoneResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ResumeZoneResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.success = reader.bool();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ResumeZoneResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ResumeZoneResponse} ResumeZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResumeZoneResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ResumeZoneResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ResumeZoneResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.success != null && message.hasOwnProperty("success"))
                        if (typeof message.success !== "boolean")
                            return "success: boolean expected";
                    return null;
                };

                /**
                 * Creates a ResumeZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ResumeZoneResponse} ResumeZoneResponse
                 */
                ResumeZoneResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ResumeZoneResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.ResumeZoneResponse();
                    if (object.success != null)
                        message.success = Boolean(object.success);
                    return message;
                };

                /**
                 * Creates a plain object from a ResumeZoneResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {plantos.admin.v1.ResumeZoneResponse} message ResumeZoneResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ResumeZoneResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.success = false;
                    if (message.success != null && message.hasOwnProperty("success"))
                        object.success = message.success;
                    return object;
                };

                /**
                 * Converts this ResumeZoneResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ResumeZoneResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ResumeZoneResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ResumeZoneResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ResumeZoneResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ResumeZoneResponse";
                };

                return ResumeZoneResponse;
            })();

            v1.GetZoneSettingsRequest = (function() {

                /**
                 * Properties of a GetZoneSettingsRequest.
                 * @memberof plantos.admin.v1
                 * @interface IGetZoneSettingsRequest
                 * @property {number|null} [zoneId] GetZoneSettingsRequest zoneId
                 */

                /**
                 * Constructs a new GetZoneSettingsRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetZoneSettingsRequest.
                 * @implements IGetZoneSettingsRequest
                 * @constructor
                 * @param {plantos.admin.v1.IGetZoneSettingsRequest=} [properties] Properties to set
                 */
                function GetZoneSettingsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetZoneSettingsRequest zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @instance
                 */
                GetZoneSettingsRequest.prototype.zoneId = 0;

                /**
                 * Creates a new GetZoneSettingsRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetZoneSettingsRequest} GetZoneSettingsRequest instance
                 */
                GetZoneSettingsRequest.create = function create(properties) {
                    return new GetZoneSettingsRequest(properties);
                };

                /**
                 * Encodes the specified GetZoneSettingsRequest message. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsRequest} message GetZoneSettingsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneSettingsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    return writer;
                };

                /**
                 * Encodes the specified GetZoneSettingsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsRequest} message GetZoneSettingsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneSettingsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetZoneSettingsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetZoneSettingsRequest} GetZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneSettingsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetZoneSettingsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetZoneSettingsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetZoneSettingsRequest} GetZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneSettingsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetZoneSettingsRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetZoneSettingsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    return null;
                };

                /**
                 * Creates a GetZoneSettingsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetZoneSettingsRequest} GetZoneSettingsRequest
                 */
                GetZoneSettingsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetZoneSettingsRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.GetZoneSettingsRequest();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a GetZoneSettingsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.GetZoneSettingsRequest} message GetZoneSettingsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetZoneSettingsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.zoneId = 0;
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    return object;
                };

                /**
                 * Converts this GetZoneSettingsRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetZoneSettingsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetZoneSettingsRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetZoneSettingsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetZoneSettingsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetZoneSettingsRequest";
                };

                return GetZoneSettingsRequest;
            })();

            v1.GetZoneSettingsResponse = (function() {

                /**
                 * Properties of a GetZoneSettingsResponse.
                 * @memberof plantos.admin.v1
                 * @interface IGetZoneSettingsResponse
                 * @property {plantos.admin.v1.IZoneSettings|null} [settings] GetZoneSettingsResponse settings
                 */

                /**
                 * Constructs a new GetZoneSettingsResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a GetZoneSettingsResponse.
                 * @implements IGetZoneSettingsResponse
                 * @constructor
                 * @param {plantos.admin.v1.IGetZoneSettingsResponse=} [properties] Properties to set
                 */
                function GetZoneSettingsResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * GetZoneSettingsResponse settings.
                 * @member {plantos.admin.v1.IZoneSettings|null|undefined} settings
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @instance
                 */
                GetZoneSettingsResponse.prototype.settings = null;

                /**
                 * Creates a new GetZoneSettingsResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.GetZoneSettingsResponse} GetZoneSettingsResponse instance
                 */
                GetZoneSettingsResponse.create = function create(properties) {
                    return new GetZoneSettingsResponse(properties);
                };

                /**
                 * Encodes the specified GetZoneSettingsResponse message. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsResponse} message GetZoneSettingsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneSettingsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                        $root.plantos.admin.v1.ZoneSettings.encode(message.settings, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified GetZoneSettingsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IGetZoneSettingsResponse} message GetZoneSettingsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                GetZoneSettingsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a GetZoneSettingsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.GetZoneSettingsResponse} GetZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneSettingsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.GetZoneSettingsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.settings = $root.plantos.admin.v1.ZoneSettings.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a GetZoneSettingsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.GetZoneSettingsResponse} GetZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                GetZoneSettingsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a GetZoneSettingsResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                GetZoneSettingsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.settings != null && message.hasOwnProperty("settings")) {
                        var error = $root.plantos.admin.v1.ZoneSettings.verify(message.settings);
                        if (error)
                            return "settings." + error;
                    }
                    return null;
                };

                /**
                 * Creates a GetZoneSettingsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.GetZoneSettingsResponse} GetZoneSettingsResponse
                 */
                GetZoneSettingsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.GetZoneSettingsResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.GetZoneSettingsResponse();
                    if (object.settings != null) {
                        if (typeof object.settings !== "object")
                            throw TypeError(".plantos.admin.v1.GetZoneSettingsResponse.settings: object expected");
                        message.settings = $root.plantos.admin.v1.ZoneSettings.fromObject(object.settings);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a GetZoneSettingsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.GetZoneSettingsResponse} message GetZoneSettingsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                GetZoneSettingsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.settings = null;
                    if (message.settings != null && message.hasOwnProperty("settings"))
                        object.settings = $root.plantos.admin.v1.ZoneSettings.toObject(message.settings, options);
                    return object;
                };

                /**
                 * Converts this GetZoneSettingsResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                GetZoneSettingsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for GetZoneSettingsResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.GetZoneSettingsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                GetZoneSettingsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.GetZoneSettingsResponse";
                };

                return GetZoneSettingsResponse;
            })();

            v1.UpdateZoneSettingsRequest = (function() {

                /**
                 * Properties of an UpdateZoneSettingsRequest.
                 * @memberof plantos.admin.v1
                 * @interface IUpdateZoneSettingsRequest
                 * @property {plantos.admin.v1.IZoneSettings|null} [settings] UpdateZoneSettingsRequest settings
                 */

                /**
                 * Constructs a new UpdateZoneSettingsRequest.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents an UpdateZoneSettingsRequest.
                 * @implements IUpdateZoneSettingsRequest
                 * @constructor
                 * @param {plantos.admin.v1.IUpdateZoneSettingsRequest=} [properties] Properties to set
                 */
                function UpdateZoneSettingsRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * UpdateZoneSettingsRequest settings.
                 * @member {plantos.admin.v1.IZoneSettings|null|undefined} settings
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @instance
                 */
                UpdateZoneSettingsRequest.prototype.settings = null;

                /**
                 * Creates a new UpdateZoneSettingsRequest instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsRequest=} [properties] Properties to set
                 * @returns {plantos.admin.v1.UpdateZoneSettingsRequest} UpdateZoneSettingsRequest instance
                 */
                UpdateZoneSettingsRequest.create = function create(properties) {
                    return new UpdateZoneSettingsRequest(properties);
                };

                /**
                 * Encodes the specified UpdateZoneSettingsRequest message. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsRequest.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsRequest} message UpdateZoneSettingsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UpdateZoneSettingsRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                        $root.plantos.admin.v1.ZoneSettings.encode(message.settings, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified UpdateZoneSettingsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsRequest} message UpdateZoneSettingsRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UpdateZoneSettingsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an UpdateZoneSettingsRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.UpdateZoneSettingsRequest} UpdateZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UpdateZoneSettingsRequest.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.UpdateZoneSettingsRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.settings = $root.plantos.admin.v1.ZoneSettings.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an UpdateZoneSettingsRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.UpdateZoneSettingsRequest} UpdateZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UpdateZoneSettingsRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UpdateZoneSettingsRequest message.
                 * @function verify
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UpdateZoneSettingsRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.settings != null && message.hasOwnProperty("settings")) {
                        var error = $root.plantos.admin.v1.ZoneSettings.verify(message.settings);
                        if (error)
                            return "settings." + error;
                    }
                    return null;
                };

                /**
                 * Creates an UpdateZoneSettingsRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.UpdateZoneSettingsRequest} UpdateZoneSettingsRequest
                 */
                UpdateZoneSettingsRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.UpdateZoneSettingsRequest)
                        return object;
                    var message = new $root.plantos.admin.v1.UpdateZoneSettingsRequest();
                    if (object.settings != null) {
                        if (typeof object.settings !== "object")
                            throw TypeError(".plantos.admin.v1.UpdateZoneSettingsRequest.settings: object expected");
                        message.settings = $root.plantos.admin.v1.ZoneSettings.fromObject(object.settings);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an UpdateZoneSettingsRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {plantos.admin.v1.UpdateZoneSettingsRequest} message UpdateZoneSettingsRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UpdateZoneSettingsRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.settings = null;
                    if (message.settings != null && message.hasOwnProperty("settings"))
                        object.settings = $root.plantos.admin.v1.ZoneSettings.toObject(message.settings, options);
                    return object;
                };

                /**
                 * Converts this UpdateZoneSettingsRequest to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UpdateZoneSettingsRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for UpdateZoneSettingsRequest
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.UpdateZoneSettingsRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                UpdateZoneSettingsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.UpdateZoneSettingsRequest";
                };

                return UpdateZoneSettingsRequest;
            })();

            v1.UpdateZoneSettingsResponse = (function() {

                /**
                 * Properties of an UpdateZoneSettingsResponse.
                 * @memberof plantos.admin.v1
                 * @interface IUpdateZoneSettingsResponse
                 * @property {boolean|null} [success] UpdateZoneSettingsResponse success
                 * @property {plantos.admin.v1.IZoneSettings|null} [updatedSettings] UpdateZoneSettingsResponse updatedSettings
                 */

                /**
                 * Constructs a new UpdateZoneSettingsResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents an UpdateZoneSettingsResponse.
                 * @implements IUpdateZoneSettingsResponse
                 * @constructor
                 * @param {plantos.admin.v1.IUpdateZoneSettingsResponse=} [properties] Properties to set
                 */
                function UpdateZoneSettingsResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * UpdateZoneSettingsResponse success.
                 * @member {boolean} success
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @instance
                 */
                UpdateZoneSettingsResponse.prototype.success = false;

                /**
                 * UpdateZoneSettingsResponse updatedSettings.
                 * @member {plantos.admin.v1.IZoneSettings|null|undefined} updatedSettings
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @instance
                 */
                UpdateZoneSettingsResponse.prototype.updatedSettings = null;

                /**
                 * Creates a new UpdateZoneSettingsResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.UpdateZoneSettingsResponse} UpdateZoneSettingsResponse instance
                 */
                UpdateZoneSettingsResponse.create = function create(properties) {
                    return new UpdateZoneSettingsResponse(properties);
                };

                /**
                 * Encodes the specified UpdateZoneSettingsResponse message. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsResponse} message UpdateZoneSettingsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UpdateZoneSettingsResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                    if (message.updatedSettings != null && Object.hasOwnProperty.call(message, "updatedSettings"))
                        $root.plantos.admin.v1.ZoneSettings.encode(message.updatedSettings, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified UpdateZoneSettingsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.IUpdateZoneSettingsResponse} message UpdateZoneSettingsResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                UpdateZoneSettingsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an UpdateZoneSettingsResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.UpdateZoneSettingsResponse} UpdateZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UpdateZoneSettingsResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.UpdateZoneSettingsResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.success = reader.bool();
                                break;
                            }
                        case 2: {
                                message.updatedSettings = $root.plantos.admin.v1.ZoneSettings.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an UpdateZoneSettingsResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.UpdateZoneSettingsResponse} UpdateZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                UpdateZoneSettingsResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an UpdateZoneSettingsResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                UpdateZoneSettingsResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.success != null && message.hasOwnProperty("success"))
                        if (typeof message.success !== "boolean")
                            return "success: boolean expected";
                    if (message.updatedSettings != null && message.hasOwnProperty("updatedSettings")) {
                        var error = $root.plantos.admin.v1.ZoneSettings.verify(message.updatedSettings);
                        if (error)
                            return "updatedSettings." + error;
                    }
                    return null;
                };

                /**
                 * Creates an UpdateZoneSettingsResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.UpdateZoneSettingsResponse} UpdateZoneSettingsResponse
                 */
                UpdateZoneSettingsResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.UpdateZoneSettingsResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.UpdateZoneSettingsResponse();
                    if (object.success != null)
                        message.success = Boolean(object.success);
                    if (object.updatedSettings != null) {
                        if (typeof object.updatedSettings !== "object")
                            throw TypeError(".plantos.admin.v1.UpdateZoneSettingsResponse.updatedSettings: object expected");
                        message.updatedSettings = $root.plantos.admin.v1.ZoneSettings.fromObject(object.updatedSettings);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an UpdateZoneSettingsResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {plantos.admin.v1.UpdateZoneSettingsResponse} message UpdateZoneSettingsResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                UpdateZoneSettingsResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.success = false;
                        object.updatedSettings = null;
                    }
                    if (message.success != null && message.hasOwnProperty("success"))
                        object.success = message.success;
                    if (message.updatedSettings != null && message.hasOwnProperty("updatedSettings"))
                        object.updatedSettings = $root.plantos.admin.v1.ZoneSettings.toObject(message.updatedSettings, options);
                    return object;
                };

                /**
                 * Converts this UpdateZoneSettingsResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                UpdateZoneSettingsResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for UpdateZoneSettingsResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.UpdateZoneSettingsResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                UpdateZoneSettingsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.UpdateZoneSettingsResponse";
                };

                return UpdateZoneSettingsResponse;
            })();

            v1.ZoneUpdate = (function() {

                /**
                 * Properties of a ZoneUpdate.
                 * @memberof plantos.admin.v1
                 * @interface IZoneUpdate
                 * @property {number|null} [zoneId] ZoneUpdate zoneId
                 * @property {plantos.admin.v1.IZone|null} [zone] ZoneUpdate zone
                 * @property {plantos.admin.v1.ZoneUpdate.ChangeType|null} [changeType] ZoneUpdate changeType
                 * @property {google.protobuf.ITimestamp|null} [timestamp] ZoneUpdate timestamp
                 */

                /**
                 * Constructs a new ZoneUpdate.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ZoneUpdate.
                 * @implements IZoneUpdate
                 * @constructor
                 * @param {plantos.admin.v1.IZoneUpdate=} [properties] Properties to set
                 */
                function ZoneUpdate(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ZoneUpdate zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @instance
                 */
                ZoneUpdate.prototype.zoneId = 0;

                /**
                 * ZoneUpdate zone.
                 * @member {plantos.admin.v1.IZone|null|undefined} zone
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @instance
                 */
                ZoneUpdate.prototype.zone = null;

                /**
                 * ZoneUpdate changeType.
                 * @member {plantos.admin.v1.ZoneUpdate.ChangeType} changeType
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @instance
                 */
                ZoneUpdate.prototype.changeType = 0;

                /**
                 * ZoneUpdate timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @instance
                 */
                ZoneUpdate.prototype.timestamp = null;

                /**
                 * Creates a new ZoneUpdate instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {plantos.admin.v1.IZoneUpdate=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ZoneUpdate} ZoneUpdate instance
                 */
                ZoneUpdate.create = function create(properties) {
                    return new ZoneUpdate(properties);
                };

                /**
                 * Encodes the specified ZoneUpdate message. Does not implicitly {@link plantos.admin.v1.ZoneUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {plantos.admin.v1.IZoneUpdate} message ZoneUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ZoneUpdate.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.zone != null && Object.hasOwnProperty.call(message, "zone"))
                        $root.plantos.admin.v1.Zone.encode(message.zone, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.changeType != null && Object.hasOwnProperty.call(message, "changeType"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.changeType);
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ZoneUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneUpdate.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {plantos.admin.v1.IZoneUpdate} message ZoneUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ZoneUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ZoneUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ZoneUpdate} ZoneUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ZoneUpdate.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ZoneUpdate();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.zone = $root.plantos.admin.v1.Zone.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.changeType = reader.int32();
                                break;
                            }
                        case 4: {
                                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ZoneUpdate message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ZoneUpdate} ZoneUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ZoneUpdate.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ZoneUpdate message.
                 * @function verify
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ZoneUpdate.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.zone != null && message.hasOwnProperty("zone")) {
                        var error = $root.plantos.admin.v1.Zone.verify(message.zone);
                        if (error)
                            return "zone." + error;
                    }
                    if (message.changeType != null && message.hasOwnProperty("changeType"))
                        switch (message.changeType) {
                        default:
                            return "changeType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ZoneUpdate message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ZoneUpdate} ZoneUpdate
                 */
                ZoneUpdate.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ZoneUpdate)
                        return object;
                    var message = new $root.plantos.admin.v1.ZoneUpdate();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.zone != null) {
                        if (typeof object.zone !== "object")
                            throw TypeError(".plantos.admin.v1.ZoneUpdate.zone: object expected");
                        message.zone = $root.plantos.admin.v1.Zone.fromObject(object.zone);
                    }
                    switch (object.changeType) {
                    default:
                        if (typeof object.changeType === "number") {
                            message.changeType = object.changeType;
                            break;
                        }
                        break;
                    case "CHANGE_TYPE_UNSPECIFIED":
                    case 0:
                        message.changeType = 0;
                        break;
                    case "CHANGE_TYPE_STATUS":
                    case 1:
                        message.changeType = 1;
                        break;
                    case "CHANGE_TYPE_STATISTICS":
                    case 2:
                        message.changeType = 2;
                        break;
                    case "CHANGE_TYPE_WATERED":
                    case 3:
                        message.changeType = 3;
                        break;
                    case "CHANGE_TYPE_SETTINGS":
                    case 4:
                        message.changeType = 4;
                        break;
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".plantos.admin.v1.ZoneUpdate.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ZoneUpdate message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {plantos.admin.v1.ZoneUpdate} message ZoneUpdate
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ZoneUpdate.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.zoneId = 0;
                        object.zone = null;
                        object.changeType = options.enums === String ? "CHANGE_TYPE_UNSPECIFIED" : 0;
                        object.timestamp = null;
                    }
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.zone != null && message.hasOwnProperty("zone"))
                        object.zone = $root.plantos.admin.v1.Zone.toObject(message.zone, options);
                    if (message.changeType != null && message.hasOwnProperty("changeType"))
                        object.changeType = options.enums === String ? $root.plantos.admin.v1.ZoneUpdate.ChangeType[message.changeType] === undefined ? message.changeType : $root.plantos.admin.v1.ZoneUpdate.ChangeType[message.changeType] : message.changeType;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this ZoneUpdate to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ZoneUpdate.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ZoneUpdate
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ZoneUpdate
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ZoneUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ZoneUpdate";
                };

                /**
                 * ChangeType enum.
                 * @name plantos.admin.v1.ZoneUpdate.ChangeType
                 * @enum {number}
                 * @property {number} CHANGE_TYPE_UNSPECIFIED=0 CHANGE_TYPE_UNSPECIFIED value
                 * @property {number} CHANGE_TYPE_STATUS=1 CHANGE_TYPE_STATUS value
                 * @property {number} CHANGE_TYPE_STATISTICS=2 CHANGE_TYPE_STATISTICS value
                 * @property {number} CHANGE_TYPE_WATERED=3 CHANGE_TYPE_WATERED value
                 * @property {number} CHANGE_TYPE_SETTINGS=4 CHANGE_TYPE_SETTINGS value
                 */
                ZoneUpdate.ChangeType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "CHANGE_TYPE_UNSPECIFIED"] = 0;
                    values[valuesById[1] = "CHANGE_TYPE_STATUS"] = 1;
                    values[valuesById[2] = "CHANGE_TYPE_STATISTICS"] = 2;
                    values[valuesById[3] = "CHANGE_TYPE_WATERED"] = 3;
                    values[valuesById[4] = "CHANGE_TYPE_SETTINGS"] = 4;
                    return values;
                })();

                return ZoneUpdate;
            })();

            v1.ModuleUpdate = (function() {

                /**
                 * Properties of a ModuleUpdate.
                 * @memberof plantos.admin.v1
                 * @interface IModuleUpdate
                 * @property {number|null} [moduleId] ModuleUpdate moduleId
                 * @property {plantos.admin.v1.IModule|null} [module] ModuleUpdate module
                 * @property {plantos.admin.v1.ModuleUpdate.ChangeType|null} [changeType] ModuleUpdate changeType
                 * @property {google.protobuf.ITimestamp|null} [timestamp] ModuleUpdate timestamp
                 */

                /**
                 * Constructs a new ModuleUpdate.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a ModuleUpdate.
                 * @implements IModuleUpdate
                 * @constructor
                 * @param {plantos.admin.v1.IModuleUpdate=} [properties] Properties to set
                 */
                function ModuleUpdate(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ModuleUpdate moduleId.
                 * @member {number} moduleId
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @instance
                 */
                ModuleUpdate.prototype.moduleId = 0;

                /**
                 * ModuleUpdate module.
                 * @member {plantos.admin.v1.IModule|null|undefined} module
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @instance
                 */
                ModuleUpdate.prototype.module = null;

                /**
                 * ModuleUpdate changeType.
                 * @member {plantos.admin.v1.ModuleUpdate.ChangeType} changeType
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @instance
                 */
                ModuleUpdate.prototype.changeType = 0;

                /**
                 * ModuleUpdate timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @instance
                 */
                ModuleUpdate.prototype.timestamp = null;

                /**
                 * Creates a new ModuleUpdate instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {plantos.admin.v1.IModuleUpdate=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ModuleUpdate} ModuleUpdate instance
                 */
                ModuleUpdate.create = function create(properties) {
                    return new ModuleUpdate(properties);
                };

                /**
                 * Encodes the specified ModuleUpdate message. Does not implicitly {@link plantos.admin.v1.ModuleUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {plantos.admin.v1.IModuleUpdate} message ModuleUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModuleUpdate.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.moduleId != null && Object.hasOwnProperty.call(message, "moduleId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.moduleId);
                    if (message.module != null && Object.hasOwnProperty.call(message, "module"))
                        $root.plantos.admin.v1.Module.encode(message.module, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.changeType != null && Object.hasOwnProperty.call(message, "changeType"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.changeType);
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified ModuleUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.ModuleUpdate.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {plantos.admin.v1.IModuleUpdate} message ModuleUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModuleUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ModuleUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ModuleUpdate} ModuleUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModuleUpdate.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ModuleUpdate();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.moduleId = reader.int32();
                                break;
                            }
                        case 2: {
                                message.module = $root.plantos.admin.v1.Module.decode(reader, reader.uint32());
                                break;
                            }
                        case 3: {
                                message.changeType = reader.int32();
                                break;
                            }
                        case 4: {
                                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ModuleUpdate message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ModuleUpdate} ModuleUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModuleUpdate.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ModuleUpdate message.
                 * @function verify
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ModuleUpdate.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        if (!$util.isInteger(message.moduleId))
                            return "moduleId: integer expected";
                    if (message.module != null && message.hasOwnProperty("module")) {
                        var error = $root.plantos.admin.v1.Module.verify(message.module);
                        if (error)
                            return "module." + error;
                    }
                    if (message.changeType != null && message.hasOwnProperty("changeType"))
                        switch (message.changeType) {
                        default:
                            return "changeType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a ModuleUpdate message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ModuleUpdate} ModuleUpdate
                 */
                ModuleUpdate.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ModuleUpdate)
                        return object;
                    var message = new $root.plantos.admin.v1.ModuleUpdate();
                    if (object.moduleId != null)
                        message.moduleId = object.moduleId | 0;
                    if (object.module != null) {
                        if (typeof object.module !== "object")
                            throw TypeError(".plantos.admin.v1.ModuleUpdate.module: object expected");
                        message.module = $root.plantos.admin.v1.Module.fromObject(object.module);
                    }
                    switch (object.changeType) {
                    default:
                        if (typeof object.changeType === "number") {
                            message.changeType = object.changeType;
                            break;
                        }
                        break;
                    case "CHANGE_TYPE_UNSPECIFIED":
                    case 0:
                        message.changeType = 0;
                        break;
                    case "CHANGE_TYPE_STATUS":
                    case 1:
                        message.changeType = 1;
                        break;
                    case "CHANGE_TYPE_BATTERY":
                    case 2:
                        message.changeType = 2;
                        break;
                    case "CHANGE_TYPE_ZONES":
                    case 3:
                        message.changeType = 3;
                        break;
                    case "CHANGE_TYPE_CONNECTED":
                    case 4:
                        message.changeType = 4;
                        break;
                    case "CHANGE_TYPE_DISCONNECTED":
                    case 5:
                        message.changeType = 5;
                        break;
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".plantos.admin.v1.ModuleUpdate.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ModuleUpdate message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {plantos.admin.v1.ModuleUpdate} message ModuleUpdate
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ModuleUpdate.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.moduleId = 0;
                        object.module = null;
                        object.changeType = options.enums === String ? "CHANGE_TYPE_UNSPECIFIED" : 0;
                        object.timestamp = null;
                    }
                    if (message.moduleId != null && message.hasOwnProperty("moduleId"))
                        object.moduleId = message.moduleId;
                    if (message.module != null && message.hasOwnProperty("module"))
                        object.module = $root.plantos.admin.v1.Module.toObject(message.module, options);
                    if (message.changeType != null && message.hasOwnProperty("changeType"))
                        object.changeType = options.enums === String ? $root.plantos.admin.v1.ModuleUpdate.ChangeType[message.changeType] === undefined ? message.changeType : $root.plantos.admin.v1.ModuleUpdate.ChangeType[message.changeType] : message.changeType;
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this ModuleUpdate to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ModuleUpdate.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ModuleUpdate
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ModuleUpdate
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ModuleUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ModuleUpdate";
                };

                /**
                 * ChangeType enum.
                 * @name plantos.admin.v1.ModuleUpdate.ChangeType
                 * @enum {number}
                 * @property {number} CHANGE_TYPE_UNSPECIFIED=0 CHANGE_TYPE_UNSPECIFIED value
                 * @property {number} CHANGE_TYPE_STATUS=1 CHANGE_TYPE_STATUS value
                 * @property {number} CHANGE_TYPE_BATTERY=2 CHANGE_TYPE_BATTERY value
                 * @property {number} CHANGE_TYPE_ZONES=3 CHANGE_TYPE_ZONES value
                 * @property {number} CHANGE_TYPE_CONNECTED=4 CHANGE_TYPE_CONNECTED value
                 * @property {number} CHANGE_TYPE_DISCONNECTED=5 CHANGE_TYPE_DISCONNECTED value
                 */
                ModuleUpdate.ChangeType = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "CHANGE_TYPE_UNSPECIFIED"] = 0;
                    values[valuesById[1] = "CHANGE_TYPE_STATUS"] = 1;
                    values[valuesById[2] = "CHANGE_TYPE_BATTERY"] = 2;
                    values[valuesById[3] = "CHANGE_TYPE_ZONES"] = 3;
                    values[valuesById[4] = "CHANGE_TYPE_CONNECTED"] = 4;
                    values[valuesById[5] = "CHANGE_TYPE_DISCONNECTED"] = 5;
                    return values;
                })();

                return ModuleUpdate;
            })();

            v1.StatisticsUpdate = (function() {

                /**
                 * Properties of a StatisticsUpdate.
                 * @memberof plantos.admin.v1
                 * @interface IStatisticsUpdate
                 * @property {number|null} [zoneId] StatisticsUpdate zoneId
                 * @property {Array.<plantos.admin.v1.IStatistic>|null} [updatedStatistics] StatisticsUpdate updatedStatistics
                 * @property {google.protobuf.ITimestamp|null} [timestamp] StatisticsUpdate timestamp
                 */

                /**
                 * Constructs a new StatisticsUpdate.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents a StatisticsUpdate.
                 * @implements IStatisticsUpdate
                 * @constructor
                 * @param {plantos.admin.v1.IStatisticsUpdate=} [properties] Properties to set
                 */
                function StatisticsUpdate(properties) {
                    this.updatedStatistics = [];
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * StatisticsUpdate zoneId.
                 * @member {number} zoneId
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @instance
                 */
                StatisticsUpdate.prototype.zoneId = 0;

                /**
                 * StatisticsUpdate updatedStatistics.
                 * @member {Array.<plantos.admin.v1.IStatistic>} updatedStatistics
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @instance
                 */
                StatisticsUpdate.prototype.updatedStatistics = $util.emptyArray;

                /**
                 * StatisticsUpdate timestamp.
                 * @member {google.protobuf.ITimestamp|null|undefined} timestamp
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @instance
                 */
                StatisticsUpdate.prototype.timestamp = null;

                /**
                 * Creates a new StatisticsUpdate instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {plantos.admin.v1.IStatisticsUpdate=} [properties] Properties to set
                 * @returns {plantos.admin.v1.StatisticsUpdate} StatisticsUpdate instance
                 */
                StatisticsUpdate.create = function create(properties) {
                    return new StatisticsUpdate(properties);
                };

                /**
                 * Encodes the specified StatisticsUpdate message. Does not implicitly {@link plantos.admin.v1.StatisticsUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {plantos.admin.v1.IStatisticsUpdate} message StatisticsUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StatisticsUpdate.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.zoneId != null && Object.hasOwnProperty.call(message, "zoneId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.zoneId);
                    if (message.updatedStatistics != null && message.updatedStatistics.length)
                        for (var i = 0; i < message.updatedStatistics.length; ++i)
                            $root.plantos.admin.v1.Statistic.encode(message.updatedStatistics[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                    if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                        $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified StatisticsUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.StatisticsUpdate.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {plantos.admin.v1.IStatisticsUpdate} message StatisticsUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                StatisticsUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a StatisticsUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.StatisticsUpdate} StatisticsUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StatisticsUpdate.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.StatisticsUpdate();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.zoneId = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.updatedStatistics && message.updatedStatistics.length))
                                    message.updatedStatistics = [];
                                message.updatedStatistics.push($root.plantos.admin.v1.Statistic.decode(reader, reader.uint32()));
                                break;
                            }
                        case 3: {
                                message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a StatisticsUpdate message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.StatisticsUpdate} StatisticsUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                StatisticsUpdate.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a StatisticsUpdate message.
                 * @function verify
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                StatisticsUpdate.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        if (!$util.isInteger(message.zoneId))
                            return "zoneId: integer expected";
                    if (message.updatedStatistics != null && message.hasOwnProperty("updatedStatistics")) {
                        if (!Array.isArray(message.updatedStatistics))
                            return "updatedStatistics: array expected";
                        for (var i = 0; i < message.updatedStatistics.length; ++i) {
                            var error = $root.plantos.admin.v1.Statistic.verify(message.updatedStatistics[i]);
                            if (error)
                                return "updatedStatistics." + error;
                        }
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                        if (error)
                            return "timestamp." + error;
                    }
                    return null;
                };

                /**
                 * Creates a StatisticsUpdate message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.StatisticsUpdate} StatisticsUpdate
                 */
                StatisticsUpdate.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.StatisticsUpdate)
                        return object;
                    var message = new $root.plantos.admin.v1.StatisticsUpdate();
                    if (object.zoneId != null)
                        message.zoneId = object.zoneId | 0;
                    if (object.updatedStatistics) {
                        if (!Array.isArray(object.updatedStatistics))
                            throw TypeError(".plantos.admin.v1.StatisticsUpdate.updatedStatistics: array expected");
                        message.updatedStatistics = [];
                        for (var i = 0; i < object.updatedStatistics.length; ++i) {
                            if (typeof object.updatedStatistics[i] !== "object")
                                throw TypeError(".plantos.admin.v1.StatisticsUpdate.updatedStatistics: object expected");
                            message.updatedStatistics[i] = $root.plantos.admin.v1.Statistic.fromObject(object.updatedStatistics[i]);
                        }
                    }
                    if (object.timestamp != null) {
                        if (typeof object.timestamp !== "object")
                            throw TypeError(".plantos.admin.v1.StatisticsUpdate.timestamp: object expected");
                        message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a StatisticsUpdate message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {plantos.admin.v1.StatisticsUpdate} message StatisticsUpdate
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                StatisticsUpdate.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                        object.updatedStatistics = [];
                    if (options.defaults) {
                        object.zoneId = 0;
                        object.timestamp = null;
                    }
                    if (message.zoneId != null && message.hasOwnProperty("zoneId"))
                        object.zoneId = message.zoneId;
                    if (message.updatedStatistics && message.updatedStatistics.length) {
                        object.updatedStatistics = [];
                        for (var j = 0; j < message.updatedStatistics.length; ++j)
                            object.updatedStatistics[j] = $root.plantos.admin.v1.Statistic.toObject(message.updatedStatistics[j], options);
                    }
                    if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                        object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                    return object;
                };

                /**
                 * Converts this StatisticsUpdate to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                StatisticsUpdate.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for StatisticsUpdate
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.StatisticsUpdate
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                StatisticsUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.StatisticsUpdate";
                };

                return StatisticsUpdate;
            })();

            v1.ErrorResponse = (function() {

                /**
                 * Properties of an ErrorResponse.
                 * @memberof plantos.admin.v1
                 * @interface IErrorResponse
                 * @property {plantos.admin.v1.ErrorCode|null} [code] ErrorResponse code
                 * @property {string|null} [message] ErrorResponse message
                 * @property {string|null} [requestType] ErrorResponse requestType
                 */

                /**
                 * Constructs a new ErrorResponse.
                 * @memberof plantos.admin.v1
                 * @classdesc Represents an ErrorResponse.
                 * @implements IErrorResponse
                 * @constructor
                 * @param {plantos.admin.v1.IErrorResponse=} [properties] Properties to set
                 */
                function ErrorResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ErrorResponse code.
                 * @member {plantos.admin.v1.ErrorCode} code
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @instance
                 */
                ErrorResponse.prototype.code = 0;

                /**
                 * ErrorResponse message.
                 * @member {string} message
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @instance
                 */
                ErrorResponse.prototype.message = "";

                /**
                 * ErrorResponse requestType.
                 * @member {string} requestType
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @instance
                 */
                ErrorResponse.prototype.requestType = "";

                /**
                 * Creates a new ErrorResponse instance using the specified properties.
                 * @function create
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {plantos.admin.v1.IErrorResponse=} [properties] Properties to set
                 * @returns {plantos.admin.v1.ErrorResponse} ErrorResponse instance
                 */
                ErrorResponse.create = function create(properties) {
                    return new ErrorResponse(properties);
                };

                /**
                 * Encodes the specified ErrorResponse message. Does not implicitly {@link plantos.admin.v1.ErrorResponse.verify|verify} messages.
                 * @function encode
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {plantos.admin.v1.IErrorResponse} message ErrorResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ErrorResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    if (message.requestType != null && Object.hasOwnProperty.call(message, "requestType"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.requestType);
                    return writer;
                };

                /**
                 * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ErrorResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {plantos.admin.v1.IErrorResponse} message ErrorResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an ErrorResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {plantos.admin.v1.ErrorResponse} ErrorResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ErrorResponse.decode = function decode(reader, length, error) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.plantos.admin.v1.ErrorResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
                                break;
                            }
                        case 2: {
                                message.message = reader.string();
                                break;
                            }
                        case 3: {
                                message.requestType = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {plantos.admin.v1.ErrorResponse} ErrorResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ErrorResponse message.
                 * @function verify
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ErrorResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.code != null && message.hasOwnProperty("code"))
                        switch (message.code) {
                        default:
                            return "code: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            break;
                        }
                    if (message.message != null && message.hasOwnProperty("message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    if (message.requestType != null && message.hasOwnProperty("requestType"))
                        if (!$util.isString(message.requestType))
                            return "requestType: string expected";
                    return null;
                };

                /**
                 * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {plantos.admin.v1.ErrorResponse} ErrorResponse
                 */
                ErrorResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.plantos.admin.v1.ErrorResponse)
                        return object;
                    var message = new $root.plantos.admin.v1.ErrorResponse();
                    switch (object.code) {
                    default:
                        if (typeof object.code === "number") {
                            message.code = object.code;
                            break;
                        }
                        break;
                    case "ERROR_CODE_UNSPECIFIED":
                    case 0:
                        message.code = 0;
                        break;
                    case "ERROR_CODE_INVALID_REQUEST":
                    case 1:
                        message.code = 1;
                        break;
                    case "ERROR_CODE_ZONE_NOT_FOUND":
                    case 2:
                        message.code = 2;
                        break;
                    case "ERROR_CODE_MODULE_NOT_FOUND":
                    case 3:
                        message.code = 3;
                        break;
                    case "ERROR_CODE_ZONE_BUSY":
                    case 4:
                        message.code = 4;
                        break;
                    case "ERROR_CODE_MODULE_OFFLINE":
                    case 5:
                        message.code = 5;
                        break;
                    case "ERROR_CODE_INTERNAL_ERROR":
                    case 6:
                        message.code = 6;
                        break;
                    case "ERROR_CODE_INVALID_TIME_RANGE":
                    case 7:
                        message.code = 7;
                        break;
                    case "ERROR_CODE_VERSION_MISMATCH":
                    case 8:
                        message.code = 8;
                        break;
                    }
                    if (object.message != null)
                        message.message = String(object.message);
                    if (object.requestType != null)
                        message.requestType = String(object.requestType);
                    return message;
                };

                /**
                 * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {plantos.admin.v1.ErrorResponse} message ErrorResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ErrorResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.code = options.enums === String ? "ERROR_CODE_UNSPECIFIED" : 0;
                        object.message = "";
                        object.requestType = "";
                    }
                    if (message.code != null && message.hasOwnProperty("code"))
                        object.code = options.enums === String ? $root.plantos.admin.v1.ErrorCode[message.code] === undefined ? message.code : $root.plantos.admin.v1.ErrorCode[message.code] : message.code;
                    if (message.message != null && message.hasOwnProperty("message"))
                        object.message = message.message;
                    if (message.requestType != null && message.hasOwnProperty("requestType"))
                        object.requestType = message.requestType;
                    return object;
                };

                /**
                 * Converts this ErrorResponse to JSON.
                 * @function toJSON
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ErrorResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ErrorResponse
                 * @function getTypeUrl
                 * @memberof plantos.admin.v1.ErrorResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/plantos.admin.v1.ErrorResponse";
                };

                return ErrorResponse;
            })();

            /**
             * MessageType enum.
             * @name plantos.admin.v1.MessageType
             * @enum {number}
             * @property {number} MESSAGE_TYPE_UNSPECIFIED=0 MESSAGE_TYPE_UNSPECIFIED value
             * @property {number} MSG_HELLO=1 MSG_HELLO value
             * @property {number} MSG_LIST_MODULES_REQUEST=2 MSG_LIST_MODULES_REQUEST value
             * @property {number} MSG_GET_MODULE_REQUEST=3 MSG_GET_MODULE_REQUEST value
             * @property {number} MSG_LIST_ZONES_REQUEST=4 MSG_LIST_ZONES_REQUEST value
             * @property {number} MSG_GET_ZONE_REQUEST=5 MSG_GET_ZONE_REQUEST value
             * @property {number} MSG_GET_STATISTICS_REQUEST=6 MSG_GET_STATISTICS_REQUEST value
             * @property {number} MSG_WATER_ZONE_REQUEST=7 MSG_WATER_ZONE_REQUEST value
             * @property {number} MSG_PAUSE_ZONE_REQUEST=8 MSG_PAUSE_ZONE_REQUEST value
             * @property {number} MSG_RESUME_ZONE_REQUEST=9 MSG_RESUME_ZONE_REQUEST value
             * @property {number} MSG_GET_ZONE_SETTINGS_REQUEST=10 MSG_GET_ZONE_SETTINGS_REQUEST value
             * @property {number} MSG_UPDATE_ZONE_SETTINGS_REQUEST=11 MSG_UPDATE_ZONE_SETTINGS_REQUEST value
             * @property {number} MSG_WELCOME=1001 MSG_WELCOME value
             * @property {number} MSG_LIST_MODULES_RESPONSE=1002 MSG_LIST_MODULES_RESPONSE value
             * @property {number} MSG_GET_MODULE_RESPONSE=1003 MSG_GET_MODULE_RESPONSE value
             * @property {number} MSG_LIST_ZONES_RESPONSE=1004 MSG_LIST_ZONES_RESPONSE value
             * @property {number} MSG_GET_ZONE_RESPONSE=1005 MSG_GET_ZONE_RESPONSE value
             * @property {number} MSG_GET_STATISTICS_RESPONSE=1006 MSG_GET_STATISTICS_RESPONSE value
             * @property {number} MSG_WATER_ZONE_RESPONSE=1007 MSG_WATER_ZONE_RESPONSE value
             * @property {number} MSG_PAUSE_ZONE_RESPONSE=1008 MSG_PAUSE_ZONE_RESPONSE value
             * @property {number} MSG_RESUME_ZONE_RESPONSE=1009 MSG_RESUME_ZONE_RESPONSE value
             * @property {number} MSG_GET_ZONE_SETTINGS_RESPONSE=1010 MSG_GET_ZONE_SETTINGS_RESPONSE value
             * @property {number} MSG_UPDATE_ZONE_SETTINGS_RESPONSE=1011 MSG_UPDATE_ZONE_SETTINGS_RESPONSE value
             * @property {number} MSG_ZONE_UPDATE=2001 MSG_ZONE_UPDATE value
             * @property {number} MSG_MODULE_UPDATE=2002 MSG_MODULE_UPDATE value
             * @property {number} MSG_STATISTICS_UPDATE=2003 MSG_STATISTICS_UPDATE value
             * @property {number} MSG_ERROR_RESPONSE=3001 MSG_ERROR_RESPONSE value
             */
            v1.MessageType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "MESSAGE_TYPE_UNSPECIFIED"] = 0;
                values[valuesById[1] = "MSG_HELLO"] = 1;
                values[valuesById[2] = "MSG_LIST_MODULES_REQUEST"] = 2;
                values[valuesById[3] = "MSG_GET_MODULE_REQUEST"] = 3;
                values[valuesById[4] = "MSG_LIST_ZONES_REQUEST"] = 4;
                values[valuesById[5] = "MSG_GET_ZONE_REQUEST"] = 5;
                values[valuesById[6] = "MSG_GET_STATISTICS_REQUEST"] = 6;
                values[valuesById[7] = "MSG_WATER_ZONE_REQUEST"] = 7;
                values[valuesById[8] = "MSG_PAUSE_ZONE_REQUEST"] = 8;
                values[valuesById[9] = "MSG_RESUME_ZONE_REQUEST"] = 9;
                values[valuesById[10] = "MSG_GET_ZONE_SETTINGS_REQUEST"] = 10;
                values[valuesById[11] = "MSG_UPDATE_ZONE_SETTINGS_REQUEST"] = 11;
                values[valuesById[1001] = "MSG_WELCOME"] = 1001;
                values[valuesById[1002] = "MSG_LIST_MODULES_RESPONSE"] = 1002;
                values[valuesById[1003] = "MSG_GET_MODULE_RESPONSE"] = 1003;
                values[valuesById[1004] = "MSG_LIST_ZONES_RESPONSE"] = 1004;
                values[valuesById[1005] = "MSG_GET_ZONE_RESPONSE"] = 1005;
                values[valuesById[1006] = "MSG_GET_STATISTICS_RESPONSE"] = 1006;
                values[valuesById[1007] = "MSG_WATER_ZONE_RESPONSE"] = 1007;
                values[valuesById[1008] = "MSG_PAUSE_ZONE_RESPONSE"] = 1008;
                values[valuesById[1009] = "MSG_RESUME_ZONE_RESPONSE"] = 1009;
                values[valuesById[1010] = "MSG_GET_ZONE_SETTINGS_RESPONSE"] = 1010;
                values[valuesById[1011] = "MSG_UPDATE_ZONE_SETTINGS_RESPONSE"] = 1011;
                values[valuesById[2001] = "MSG_ZONE_UPDATE"] = 2001;
                values[valuesById[2002] = "MSG_MODULE_UPDATE"] = 2002;
                values[valuesById[2003] = "MSG_STATISTICS_UPDATE"] = 2003;
                values[valuesById[3001] = "MSG_ERROR_RESPONSE"] = 3001;
                return values;
            })();

            return v1;
        })();

        return admin;
    })();

    return plantos;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        protobuf.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof google.protobuf
             * @interface IDuration
             * @property {Long|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof google.protobuf
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             */
            function Duration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Duration seconds.
             * @member {Long} seconds
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            /**
             * Creates a new Duration instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             * @returns {google.protobuf.Duration} Duration instance
             */
            Duration.create = function create(properties) {
                return new Duration(properties);
            };

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} message Duration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Duration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Duration message.
             * @function verify
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Duration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Duration} Duration
             */
            Duration.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Duration)
                    return object;
                var message = new $root.google.protobuf.Duration();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.Duration} message Duration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Duration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Duration to JSON.
             * @function toJSON
             * @memberof google.protobuf.Duration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Duration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Duration
             * @function getTypeUrl
             * @memberof google.protobuf.Duration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Duration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Duration";
            };

            return Duration;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;

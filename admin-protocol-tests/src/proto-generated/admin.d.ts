import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace plantos. */
export namespace plantos {

    /** Namespace admin. */
    namespace admin {

        /** Namespace v1. */
        namespace v1 {

            /** Status enum. */
            enum Status {
                STATUS_UNSPECIFIED = 0,
                STATUS_IDLE = 1,
                STATUS_WORKING = 2,
                STATUS_PAUSED = 3,
                STATUS_ERROR = 4,
                STATUS_OFFLINE = 5
            }

            /** StatisticType enum. */
            enum StatisticType {
                STATISTIC_TYPE_UNSPECIFIED = 0,
                STATISTIC_TYPE_TEMPERATURE = 1,
                STATISTIC_TYPE_HUMIDITY = 2,
                STATISTIC_TYPE_LIGHT = 3,
                STATISTIC_TYPE_SOIL_MOISTURE = 4,
                STATISTIC_TYPE_BATTERY = 5
            }

            /** ErrorCode enum. */
            enum ErrorCode {
                ERROR_CODE_UNSPECIFIED = 0,
                ERROR_CODE_INVALID_REQUEST = 1,
                ERROR_CODE_ZONE_NOT_FOUND = 2,
                ERROR_CODE_MODULE_NOT_FOUND = 3,
                ERROR_CODE_ZONE_BUSY = 4,
                ERROR_CODE_MODULE_OFFLINE = 5,
                ERROR_CODE_INTERNAL_ERROR = 6,
                ERROR_CODE_INVALID_TIME_RANGE = 7,
                ERROR_CODE_VERSION_MISMATCH = 8
            }

            /** Properties of a StatisticDataPoint. */
            interface IStatisticDataPoint {

                /** StatisticDataPoint timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);

                /** StatisticDataPoint value */
                value?: (number|null);
            }

            /** Represents a StatisticDataPoint. */
            class StatisticDataPoint implements IStatisticDataPoint {

                /**
                 * Constructs a new StatisticDataPoint.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IStatisticDataPoint);

                /** StatisticDataPoint timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /** StatisticDataPoint value. */
                public value: number;

                /**
                 * Creates a new StatisticDataPoint instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StatisticDataPoint instance
                 */
                public static create(properties?: plantos.admin.v1.IStatisticDataPoint): plantos.admin.v1.StatisticDataPoint;

                /**
                 * Encodes the specified StatisticDataPoint message. Does not implicitly {@link plantos.admin.v1.StatisticDataPoint.verify|verify} messages.
                 * @param message StatisticDataPoint message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IStatisticDataPoint, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StatisticDataPoint message, length delimited. Does not implicitly {@link plantos.admin.v1.StatisticDataPoint.verify|verify} messages.
                 * @param message StatisticDataPoint message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IStatisticDataPoint, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StatisticDataPoint message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StatisticDataPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.StatisticDataPoint;

                /**
                 * Decodes a StatisticDataPoint message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StatisticDataPoint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.StatisticDataPoint;

                /**
                 * Verifies a StatisticDataPoint message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StatisticDataPoint message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StatisticDataPoint
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.StatisticDataPoint;

                /**
                 * Creates a plain object from a StatisticDataPoint message. Also converts values to other types if specified.
                 * @param message StatisticDataPoint
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.StatisticDataPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StatisticDataPoint to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StatisticDataPoint
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Statistic. */
            interface IStatistic {

                /** Statistic type */
                type?: (plantos.admin.v1.StatisticType|null);

                /** Statistic history */
                history?: (plantos.admin.v1.IStatisticDataPoint[]|null);
            }

            /** Represents a Statistic. */
            class Statistic implements IStatistic {

                /**
                 * Constructs a new Statistic.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IStatistic);

                /** Statistic type. */
                public type: plantos.admin.v1.StatisticType;

                /** Statistic history. */
                public history: plantos.admin.v1.IStatisticDataPoint[];

                /**
                 * Creates a new Statistic instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Statistic instance
                 */
                public static create(properties?: plantos.admin.v1.IStatistic): plantos.admin.v1.Statistic;

                /**
                 * Encodes the specified Statistic message. Does not implicitly {@link plantos.admin.v1.Statistic.verify|verify} messages.
                 * @param message Statistic message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Statistic message, length delimited. Does not implicitly {@link plantos.admin.v1.Statistic.verify|verify} messages.
                 * @param message Statistic message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IStatistic, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Statistic message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Statistic
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.Statistic;

                /**
                 * Decodes a Statistic message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Statistic
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.Statistic;

                /**
                 * Verifies a Statistic message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Statistic message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Statistic
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.Statistic;

                /**
                 * Creates a plain object from a Statistic message. Also converts values to other types if specified.
                 * @param message Statistic
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.Statistic, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Statistic to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Statistic
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Zone. */
            interface IZone {

                /** Zone id */
                id?: (number|null);

                /** Zone moduleId */
                moduleId?: (number|null);

                /** Zone name */
                name?: (string|null);

                /** Zone icon */
                icon?: (string|null);

                /** Zone status */
                status?: (plantos.admin.v1.Status|null);

                /** Zone lastWatered */
                lastWatered?: (google.protobuf.ITimestamp|null);

                /** Zone currentStatistics */
                currentStatistics?: (plantos.admin.v1.IStatistic[]|null);
            }

            /** Represents a Zone. */
            class Zone implements IZone {

                /**
                 * Constructs a new Zone.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IZone);

                /** Zone id. */
                public id: number;

                /** Zone moduleId. */
                public moduleId: number;

                /** Zone name. */
                public name: string;

                /** Zone icon. */
                public icon: string;

                /** Zone status. */
                public status: plantos.admin.v1.Status;

                /** Zone lastWatered. */
                public lastWatered?: (google.protobuf.ITimestamp|null);

                /** Zone currentStatistics. */
                public currentStatistics: plantos.admin.v1.IStatistic[];

                /**
                 * Creates a new Zone instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Zone instance
                 */
                public static create(properties?: plantos.admin.v1.IZone): plantos.admin.v1.Zone;

                /**
                 * Encodes the specified Zone message. Does not implicitly {@link plantos.admin.v1.Zone.verify|verify} messages.
                 * @param message Zone message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IZone, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Zone message, length delimited. Does not implicitly {@link plantos.admin.v1.Zone.verify|verify} messages.
                 * @param message Zone message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IZone, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Zone message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Zone
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.Zone;

                /**
                 * Decodes a Zone message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Zone
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.Zone;

                /**
                 * Verifies a Zone message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Zone message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Zone
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.Zone;

                /**
                 * Creates a plain object from a Zone message. Also converts values to other types if specified.
                 * @param message Zone
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.Zone, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Zone to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Zone
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Module. */
            interface IModule {

                /** Module id */
                id?: (number|null);

                /** Module name */
                name?: (string|null);

                /** Module status */
                status?: (plantos.admin.v1.Status|null);

                /** Module batteryLevel */
                batteryLevel?: (number|null);

                /** Module zoneIds */
                zoneIds?: (number[]|null);

                /** Module lastSeen */
                lastSeen?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a Module. */
            class Module implements IModule {

                /**
                 * Constructs a new Module.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IModule);

                /** Module id. */
                public id: number;

                /** Module name. */
                public name: string;

                /** Module status. */
                public status: plantos.admin.v1.Status;

                /** Module batteryLevel. */
                public batteryLevel: number;

                /** Module zoneIds. */
                public zoneIds: number[];

                /** Module lastSeen. */
                public lastSeen?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new Module instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Module instance
                 */
                public static create(properties?: plantos.admin.v1.IModule): plantos.admin.v1.Module;

                /**
                 * Encodes the specified Module message. Does not implicitly {@link plantos.admin.v1.Module.verify|verify} messages.
                 * @param message Module message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Module message, length delimited. Does not implicitly {@link plantos.admin.v1.Module.verify|verify} messages.
                 * @param message Module message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IModule, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Module message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Module
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.Module;

                /**
                 * Decodes a Module message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Module
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.Module;

                /**
                 * Verifies a Module message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Module message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Module
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.Module;

                /**
                 * Creates a plain object from a Module message. Also converts values to other types if specified.
                 * @param message Module
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.Module, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Module to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Module
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ZoneSettings. */
            interface IZoneSettings {

                /** ZoneSettings zoneId */
                zoneId?: (number|null);

                /** ZoneSettings thresholds */
                thresholds?: (plantos.admin.v1.ZoneSettings.IThresholds|null);

                /** ZoneSettings notifyOnError */
                notifyOnError?: (boolean|null);

                /** ZoneSettings notifyOnLowBattery */
                notifyOnLowBattery?: (boolean|null);
            }

            /** Represents a ZoneSettings. */
            class ZoneSettings implements IZoneSettings {

                /**
                 * Constructs a new ZoneSettings.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IZoneSettings);

                /** ZoneSettings zoneId. */
                public zoneId: number;

                /** ZoneSettings thresholds. */
                public thresholds?: (plantos.admin.v1.ZoneSettings.IThresholds|null);

                /** ZoneSettings notifyOnError. */
                public notifyOnError: boolean;

                /** ZoneSettings notifyOnLowBattery. */
                public notifyOnLowBattery: boolean;

                /**
                 * Creates a new ZoneSettings instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ZoneSettings instance
                 */
                public static create(properties?: plantos.admin.v1.IZoneSettings): plantos.admin.v1.ZoneSettings;

                /**
                 * Encodes the specified ZoneSettings message. Does not implicitly {@link plantos.admin.v1.ZoneSettings.verify|verify} messages.
                 * @param message ZoneSettings message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IZoneSettings, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ZoneSettings message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneSettings.verify|verify} messages.
                 * @param message ZoneSettings message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IZoneSettings, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ZoneSettings message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ZoneSettings
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ZoneSettings;

                /**
                 * Decodes a ZoneSettings message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ZoneSettings
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ZoneSettings;

                /**
                 * Verifies a ZoneSettings message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ZoneSettings message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ZoneSettings
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ZoneSettings;

                /**
                 * Creates a plain object from a ZoneSettings message. Also converts values to other types if specified.
                 * @param message ZoneSettings
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ZoneSettings, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ZoneSettings to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ZoneSettings
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ZoneSettings {

                /** Properties of a Thresholds. */
                interface IThresholds {

                    /** Thresholds minTemperature */
                    minTemperature?: (number|null);

                    /** Thresholds maxTemperature */
                    maxTemperature?: (number|null);

                    /** Thresholds minSoilMoisture */
                    minSoilMoisture?: (number|null);

                    /** Thresholds maxSoilMoisture */
                    maxSoilMoisture?: (number|null);
                }

                /** Represents a Thresholds. */
                class Thresholds implements IThresholds {

                    /**
                     * Constructs a new Thresholds.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: plantos.admin.v1.ZoneSettings.IThresholds);

                    /** Thresholds minTemperature. */
                    public minTemperature: number;

                    /** Thresholds maxTemperature. */
                    public maxTemperature: number;

                    /** Thresholds minSoilMoisture. */
                    public minSoilMoisture: number;

                    /** Thresholds maxSoilMoisture. */
                    public maxSoilMoisture: number;

                    /**
                     * Creates a new Thresholds instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Thresholds instance
                     */
                    public static create(properties?: plantos.admin.v1.ZoneSettings.IThresholds): plantos.admin.v1.ZoneSettings.Thresholds;

                    /**
                     * Encodes the specified Thresholds message. Does not implicitly {@link plantos.admin.v1.ZoneSettings.Thresholds.verify|verify} messages.
                     * @param message Thresholds message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: plantos.admin.v1.ZoneSettings.IThresholds, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Thresholds message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneSettings.Thresholds.verify|verify} messages.
                     * @param message Thresholds message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: plantos.admin.v1.ZoneSettings.IThresholds, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Thresholds message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Thresholds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ZoneSettings.Thresholds;

                    /**
                     * Decodes a Thresholds message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Thresholds
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ZoneSettings.Thresholds;

                    /**
                     * Verifies a Thresholds message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Thresholds message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Thresholds
                     */
                    public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ZoneSettings.Thresholds;

                    /**
                     * Creates a plain object from a Thresholds message. Also converts values to other types if specified.
                     * @param message Thresholds
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: plantos.admin.v1.ZoneSettings.Thresholds, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Thresholds to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for Thresholds
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a Hello. */
            interface IHello {

                /** Hello protocolVersion */
                protocolVersion?: (string|null);

                /** Hello clientVersion */
                clientVersion?: (string|null);
            }

            /** Represents a Hello. */
            class Hello implements IHello {

                /**
                 * Constructs a new Hello.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IHello);

                /** Hello protocolVersion. */
                public protocolVersion: string;

                /** Hello clientVersion. */
                public clientVersion: string;

                /**
                 * Creates a new Hello instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Hello instance
                 */
                public static create(properties?: plantos.admin.v1.IHello): plantos.admin.v1.Hello;

                /**
                 * Encodes the specified Hello message. Does not implicitly {@link plantos.admin.v1.Hello.verify|verify} messages.
                 * @param message Hello message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Hello message, length delimited. Does not implicitly {@link plantos.admin.v1.Hello.verify|verify} messages.
                 * @param message Hello message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Hello message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.Hello;

                /**
                 * Decodes a Hello message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.Hello;

                /**
                 * Verifies a Hello message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Hello message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Hello
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.Hello;

                /**
                 * Creates a plain object from a Hello message. Also converts values to other types if specified.
                 * @param message Hello
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.Hello, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Hello to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Hello
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a Welcome. */
            interface IWelcome {

                /** Welcome hubId */
                hubId?: (string|null);

                /** Welcome hubVersion */
                hubVersion?: (string|null);

                /** Welcome serverTimestamp */
                serverTimestamp?: (Long|null);
            }

            /** Represents a Welcome. */
            class Welcome implements IWelcome {

                /**
                 * Constructs a new Welcome.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IWelcome);

                /** Welcome hubId. */
                public hubId: string;

                /** Welcome hubVersion. */
                public hubVersion: string;

                /** Welcome serverTimestamp. */
                public serverTimestamp: Long;

                /**
                 * Creates a new Welcome instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Welcome instance
                 */
                public static create(properties?: plantos.admin.v1.IWelcome): plantos.admin.v1.Welcome;

                /**
                 * Encodes the specified Welcome message. Does not implicitly {@link plantos.admin.v1.Welcome.verify|verify} messages.
                 * @param message Welcome message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IWelcome, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Welcome message, length delimited. Does not implicitly {@link plantos.admin.v1.Welcome.verify|verify} messages.
                 * @param message Welcome message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IWelcome, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Welcome message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Welcome
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.Welcome;

                /**
                 * Decodes a Welcome message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Welcome
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.Welcome;

                /**
                 * Verifies a Welcome message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Welcome message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Welcome
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.Welcome;

                /**
                 * Creates a plain object from a Welcome message. Also converts values to other types if specified.
                 * @param message Welcome
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.Welcome, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Welcome to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Welcome
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ListModulesRequest. */
            interface IListModulesRequest {
            }

            /** Represents a ListModulesRequest. */
            class ListModulesRequest implements IListModulesRequest {

                /**
                 * Constructs a new ListModulesRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IListModulesRequest);

                /**
                 * Creates a new ListModulesRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ListModulesRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IListModulesRequest): plantos.admin.v1.ListModulesRequest;

                /**
                 * Encodes the specified ListModulesRequest message. Does not implicitly {@link plantos.admin.v1.ListModulesRequest.verify|verify} messages.
                 * @param message ListModulesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IListModulesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ListModulesRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ListModulesRequest.verify|verify} messages.
                 * @param message ListModulesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IListModulesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ListModulesRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ListModulesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ListModulesRequest;

                /**
                 * Decodes a ListModulesRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ListModulesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ListModulesRequest;

                /**
                 * Verifies a ListModulesRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ListModulesRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ListModulesRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ListModulesRequest;

                /**
                 * Creates a plain object from a ListModulesRequest message. Also converts values to other types if specified.
                 * @param message ListModulesRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ListModulesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ListModulesRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ListModulesRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ListModulesResponse. */
            interface IListModulesResponse {

                /** ListModulesResponse modules */
                modules?: (plantos.admin.v1.IModule[]|null);
            }

            /** Represents a ListModulesResponse. */
            class ListModulesResponse implements IListModulesResponse {

                /**
                 * Constructs a new ListModulesResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IListModulesResponse);

                /** ListModulesResponse modules. */
                public modules: plantos.admin.v1.IModule[];

                /**
                 * Creates a new ListModulesResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ListModulesResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IListModulesResponse): plantos.admin.v1.ListModulesResponse;

                /**
                 * Encodes the specified ListModulesResponse message. Does not implicitly {@link plantos.admin.v1.ListModulesResponse.verify|verify} messages.
                 * @param message ListModulesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IListModulesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ListModulesResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ListModulesResponse.verify|verify} messages.
                 * @param message ListModulesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IListModulesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ListModulesResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ListModulesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ListModulesResponse;

                /**
                 * Decodes a ListModulesResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ListModulesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ListModulesResponse;

                /**
                 * Verifies a ListModulesResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ListModulesResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ListModulesResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ListModulesResponse;

                /**
                 * Creates a plain object from a ListModulesResponse message. Also converts values to other types if specified.
                 * @param message ListModulesResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ListModulesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ListModulesResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ListModulesResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetModuleRequest. */
            interface IGetModuleRequest {

                /** GetModuleRequest moduleId */
                moduleId?: (number|null);
            }

            /** Represents a GetModuleRequest. */
            class GetModuleRequest implements IGetModuleRequest {

                /**
                 * Constructs a new GetModuleRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetModuleRequest);

                /** GetModuleRequest moduleId. */
                public moduleId: number;

                /**
                 * Creates a new GetModuleRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetModuleRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IGetModuleRequest): plantos.admin.v1.GetModuleRequest;

                /**
                 * Encodes the specified GetModuleRequest message. Does not implicitly {@link plantos.admin.v1.GetModuleRequest.verify|verify} messages.
                 * @param message GetModuleRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetModuleRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetModuleRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetModuleRequest.verify|verify} messages.
                 * @param message GetModuleRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetModuleRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetModuleRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetModuleRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetModuleRequest;

                /**
                 * Decodes a GetModuleRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetModuleRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetModuleRequest;

                /**
                 * Verifies a GetModuleRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetModuleRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetModuleRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetModuleRequest;

                /**
                 * Creates a plain object from a GetModuleRequest message. Also converts values to other types if specified.
                 * @param message GetModuleRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetModuleRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetModuleRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetModuleRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetModuleResponse. */
            interface IGetModuleResponse {

                /** GetModuleResponse module */
                module?: (plantos.admin.v1.IModule|null);
            }

            /** Represents a GetModuleResponse. */
            class GetModuleResponse implements IGetModuleResponse {

                /**
                 * Constructs a new GetModuleResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetModuleResponse);

                /** GetModuleResponse module. */
                public module?: (plantos.admin.v1.IModule|null);

                /**
                 * Creates a new GetModuleResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetModuleResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IGetModuleResponse): plantos.admin.v1.GetModuleResponse;

                /**
                 * Encodes the specified GetModuleResponse message. Does not implicitly {@link plantos.admin.v1.GetModuleResponse.verify|verify} messages.
                 * @param message GetModuleResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetModuleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetModuleResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetModuleResponse.verify|verify} messages.
                 * @param message GetModuleResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetModuleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetModuleResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetModuleResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetModuleResponse;

                /**
                 * Decodes a GetModuleResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetModuleResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetModuleResponse;

                /**
                 * Verifies a GetModuleResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetModuleResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetModuleResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetModuleResponse;

                /**
                 * Creates a plain object from a GetModuleResponse message. Also converts values to other types if specified.
                 * @param message GetModuleResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetModuleResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetModuleResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetModuleResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ListZonesRequest. */
            interface IListZonesRequest {

                /** ListZonesRequest moduleId */
                moduleId?: (number|null);
            }

            /** Represents a ListZonesRequest. */
            class ListZonesRequest implements IListZonesRequest {

                /**
                 * Constructs a new ListZonesRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IListZonesRequest);

                /** ListZonesRequest moduleId. */
                public moduleId?: (number|null);

                /**
                 * Creates a new ListZonesRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ListZonesRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IListZonesRequest): plantos.admin.v1.ListZonesRequest;

                /**
                 * Encodes the specified ListZonesRequest message. Does not implicitly {@link plantos.admin.v1.ListZonesRequest.verify|verify} messages.
                 * @param message ListZonesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IListZonesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ListZonesRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ListZonesRequest.verify|verify} messages.
                 * @param message ListZonesRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IListZonesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ListZonesRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ListZonesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ListZonesRequest;

                /**
                 * Decodes a ListZonesRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ListZonesRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ListZonesRequest;

                /**
                 * Verifies a ListZonesRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ListZonesRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ListZonesRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ListZonesRequest;

                /**
                 * Creates a plain object from a ListZonesRequest message. Also converts values to other types if specified.
                 * @param message ListZonesRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ListZonesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ListZonesRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ListZonesRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ListZonesResponse. */
            interface IListZonesResponse {

                /** ListZonesResponse zones */
                zones?: (plantos.admin.v1.IZone[]|null);
            }

            /** Represents a ListZonesResponse. */
            class ListZonesResponse implements IListZonesResponse {

                /**
                 * Constructs a new ListZonesResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IListZonesResponse);

                /** ListZonesResponse zones. */
                public zones: plantos.admin.v1.IZone[];

                /**
                 * Creates a new ListZonesResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ListZonesResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IListZonesResponse): plantos.admin.v1.ListZonesResponse;

                /**
                 * Encodes the specified ListZonesResponse message. Does not implicitly {@link plantos.admin.v1.ListZonesResponse.verify|verify} messages.
                 * @param message ListZonesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IListZonesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ListZonesResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ListZonesResponse.verify|verify} messages.
                 * @param message ListZonesResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IListZonesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ListZonesResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ListZonesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ListZonesResponse;

                /**
                 * Decodes a ListZonesResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ListZonesResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ListZonesResponse;

                /**
                 * Verifies a ListZonesResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ListZonesResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ListZonesResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ListZonesResponse;

                /**
                 * Creates a plain object from a ListZonesResponse message. Also converts values to other types if specified.
                 * @param message ListZonesResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ListZonesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ListZonesResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ListZonesResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetZoneRequest. */
            interface IGetZoneRequest {

                /** GetZoneRequest zoneId */
                zoneId?: (number|null);
            }

            /** Represents a GetZoneRequest. */
            class GetZoneRequest implements IGetZoneRequest {

                /**
                 * Constructs a new GetZoneRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetZoneRequest);

                /** GetZoneRequest zoneId. */
                public zoneId: number;

                /**
                 * Creates a new GetZoneRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetZoneRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IGetZoneRequest): plantos.admin.v1.GetZoneRequest;

                /**
                 * Encodes the specified GetZoneRequest message. Does not implicitly {@link plantos.admin.v1.GetZoneRequest.verify|verify} messages.
                 * @param message GetZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneRequest.verify|verify} messages.
                 * @param message GetZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetZoneRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetZoneRequest;

                /**
                 * Decodes a GetZoneRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetZoneRequest;

                /**
                 * Verifies a GetZoneRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetZoneRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetZoneRequest;

                /**
                 * Creates a plain object from a GetZoneRequest message. Also converts values to other types if specified.
                 * @param message GetZoneRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetZoneRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetZoneRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetZoneRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetZoneResponse. */
            interface IGetZoneResponse {

                /** GetZoneResponse zone */
                zone?: (plantos.admin.v1.IZone|null);
            }

            /** Represents a GetZoneResponse. */
            class GetZoneResponse implements IGetZoneResponse {

                /**
                 * Constructs a new GetZoneResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetZoneResponse);

                /** GetZoneResponse zone. */
                public zone?: (plantos.admin.v1.IZone|null);

                /**
                 * Creates a new GetZoneResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetZoneResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IGetZoneResponse): plantos.admin.v1.GetZoneResponse;

                /**
                 * Encodes the specified GetZoneResponse message. Does not implicitly {@link plantos.admin.v1.GetZoneResponse.verify|verify} messages.
                 * @param message GetZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneResponse.verify|verify} messages.
                 * @param message GetZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetZoneResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetZoneResponse;

                /**
                 * Decodes a GetZoneResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetZoneResponse;

                /**
                 * Verifies a GetZoneResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetZoneResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetZoneResponse;

                /**
                 * Creates a plain object from a GetZoneResponse message. Also converts values to other types if specified.
                 * @param message GetZoneResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetZoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetZoneResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetZoneResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetStatisticsRequest. */
            interface IGetStatisticsRequest {

                /** GetStatisticsRequest zoneId */
                zoneId?: (number|null);

                /** GetStatisticsRequest from */
                from?: (google.protobuf.ITimestamp|null);

                /** GetStatisticsRequest to */
                to?: (google.protobuf.ITimestamp|null);

                /** GetStatisticsRequest types */
                types?: (plantos.admin.v1.StatisticType[]|null);

                /** GetStatisticsRequest aggregation */
                aggregation?: (plantos.admin.v1.GetStatisticsRequest.Aggregation|null);
            }

            /** Represents a GetStatisticsRequest. */
            class GetStatisticsRequest implements IGetStatisticsRequest {

                /**
                 * Constructs a new GetStatisticsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetStatisticsRequest);

                /** GetStatisticsRequest zoneId. */
                public zoneId: number;

                /** GetStatisticsRequest from. */
                public from?: (google.protobuf.ITimestamp|null);

                /** GetStatisticsRequest to. */
                public to?: (google.protobuf.ITimestamp|null);

                /** GetStatisticsRequest types. */
                public types: plantos.admin.v1.StatisticType[];

                /** GetStatisticsRequest aggregation. */
                public aggregation: plantos.admin.v1.GetStatisticsRequest.Aggregation;

                /**
                 * Creates a new GetStatisticsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetStatisticsRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IGetStatisticsRequest): plantos.admin.v1.GetStatisticsRequest;

                /**
                 * Encodes the specified GetStatisticsRequest message. Does not implicitly {@link plantos.admin.v1.GetStatisticsRequest.verify|verify} messages.
                 * @param message GetStatisticsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetStatisticsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetStatisticsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetStatisticsRequest.verify|verify} messages.
                 * @param message GetStatisticsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetStatisticsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetStatisticsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetStatisticsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetStatisticsRequest;

                /**
                 * Decodes a GetStatisticsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetStatisticsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetStatisticsRequest;

                /**
                 * Verifies a GetStatisticsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetStatisticsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetStatisticsRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetStatisticsRequest;

                /**
                 * Creates a plain object from a GetStatisticsRequest message. Also converts values to other types if specified.
                 * @param message GetStatisticsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetStatisticsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetStatisticsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetStatisticsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace GetStatisticsRequest {

                /** Aggregation enum. */
                enum Aggregation {
                    AGGREGATION_NONE = 0,
                    AGGREGATION_HOURLY = 1,
                    AGGREGATION_DAILY = 2,
                    AGGREGATION_WEEKLY = 3
                }
            }

            /** Properties of a GetStatisticsResponse. */
            interface IGetStatisticsResponse {

                /** GetStatisticsResponse zoneId */
                zoneId?: (number|null);

                /** GetStatisticsResponse statistics */
                statistics?: (plantos.admin.v1.IStatistic[]|null);
            }

            /** Represents a GetStatisticsResponse. */
            class GetStatisticsResponse implements IGetStatisticsResponse {

                /**
                 * Constructs a new GetStatisticsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetStatisticsResponse);

                /** GetStatisticsResponse zoneId. */
                public zoneId: number;

                /** GetStatisticsResponse statistics. */
                public statistics: plantos.admin.v1.IStatistic[];

                /**
                 * Creates a new GetStatisticsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetStatisticsResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IGetStatisticsResponse): plantos.admin.v1.GetStatisticsResponse;

                /**
                 * Encodes the specified GetStatisticsResponse message. Does not implicitly {@link plantos.admin.v1.GetStatisticsResponse.verify|verify} messages.
                 * @param message GetStatisticsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetStatisticsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetStatisticsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetStatisticsResponse.verify|verify} messages.
                 * @param message GetStatisticsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetStatisticsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetStatisticsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetStatisticsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetStatisticsResponse;

                /**
                 * Decodes a GetStatisticsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetStatisticsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetStatisticsResponse;

                /**
                 * Verifies a GetStatisticsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetStatisticsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetStatisticsResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetStatisticsResponse;

                /**
                 * Creates a plain object from a GetStatisticsResponse message. Also converts values to other types if specified.
                 * @param message GetStatisticsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetStatisticsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetStatisticsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetStatisticsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a WaterZoneRequest. */
            interface IWaterZoneRequest {

                /** WaterZoneRequest zoneId */
                zoneId?: (number|null);

                /** WaterZoneRequest duration */
                duration?: (google.protobuf.IDuration|null);
            }

            /** Represents a WaterZoneRequest. */
            class WaterZoneRequest implements IWaterZoneRequest {

                /**
                 * Constructs a new WaterZoneRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IWaterZoneRequest);

                /** WaterZoneRequest zoneId. */
                public zoneId: number;

                /** WaterZoneRequest duration. */
                public duration?: (google.protobuf.IDuration|null);

                /**
                 * Creates a new WaterZoneRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WaterZoneRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IWaterZoneRequest): plantos.admin.v1.WaterZoneRequest;

                /**
                 * Encodes the specified WaterZoneRequest message. Does not implicitly {@link plantos.admin.v1.WaterZoneRequest.verify|verify} messages.
                 * @param message WaterZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IWaterZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WaterZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.WaterZoneRequest.verify|verify} messages.
                 * @param message WaterZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IWaterZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WaterZoneRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WaterZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.WaterZoneRequest;

                /**
                 * Decodes a WaterZoneRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WaterZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.WaterZoneRequest;

                /**
                 * Verifies a WaterZoneRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WaterZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WaterZoneRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.WaterZoneRequest;

                /**
                 * Creates a plain object from a WaterZoneRequest message. Also converts values to other types if specified.
                 * @param message WaterZoneRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.WaterZoneRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WaterZoneRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for WaterZoneRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a WaterZoneResponse. */
            interface IWaterZoneResponse {

                /** WaterZoneResponse success */
                success?: (boolean|null);

                /** WaterZoneResponse startedAt */
                startedAt?: (google.protobuf.ITimestamp|null);

                /** WaterZoneResponse duration */
                duration?: (google.protobuf.IDuration|null);
            }

            /** Represents a WaterZoneResponse. */
            class WaterZoneResponse implements IWaterZoneResponse {

                /**
                 * Constructs a new WaterZoneResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IWaterZoneResponse);

                /** WaterZoneResponse success. */
                public success: boolean;

                /** WaterZoneResponse startedAt. */
                public startedAt?: (google.protobuf.ITimestamp|null);

                /** WaterZoneResponse duration. */
                public duration?: (google.protobuf.IDuration|null);

                /**
                 * Creates a new WaterZoneResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns WaterZoneResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IWaterZoneResponse): plantos.admin.v1.WaterZoneResponse;

                /**
                 * Encodes the specified WaterZoneResponse message. Does not implicitly {@link plantos.admin.v1.WaterZoneResponse.verify|verify} messages.
                 * @param message WaterZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IWaterZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified WaterZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.WaterZoneResponse.verify|verify} messages.
                 * @param message WaterZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IWaterZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a WaterZoneResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns WaterZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.WaterZoneResponse;

                /**
                 * Decodes a WaterZoneResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns WaterZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.WaterZoneResponse;

                /**
                 * Verifies a WaterZoneResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a WaterZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns WaterZoneResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.WaterZoneResponse;

                /**
                 * Creates a plain object from a WaterZoneResponse message. Also converts values to other types if specified.
                 * @param message WaterZoneResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.WaterZoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this WaterZoneResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for WaterZoneResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PauseZoneRequest. */
            interface IPauseZoneRequest {

                /** PauseZoneRequest zoneId */
                zoneId?: (number|null);
            }

            /** Represents a PauseZoneRequest. */
            class PauseZoneRequest implements IPauseZoneRequest {

                /**
                 * Constructs a new PauseZoneRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IPauseZoneRequest);

                /** PauseZoneRequest zoneId. */
                public zoneId: number;

                /**
                 * Creates a new PauseZoneRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PauseZoneRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IPauseZoneRequest): plantos.admin.v1.PauseZoneRequest;

                /**
                 * Encodes the specified PauseZoneRequest message. Does not implicitly {@link plantos.admin.v1.PauseZoneRequest.verify|verify} messages.
                 * @param message PauseZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IPauseZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PauseZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.PauseZoneRequest.verify|verify} messages.
                 * @param message PauseZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IPauseZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PauseZoneRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PauseZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.PauseZoneRequest;

                /**
                 * Decodes a PauseZoneRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PauseZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.PauseZoneRequest;

                /**
                 * Verifies a PauseZoneRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PauseZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PauseZoneRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.PauseZoneRequest;

                /**
                 * Creates a plain object from a PauseZoneRequest message. Also converts values to other types if specified.
                 * @param message PauseZoneRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.PauseZoneRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PauseZoneRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PauseZoneRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a PauseZoneResponse. */
            interface IPauseZoneResponse {

                /** PauseZoneResponse success */
                success?: (boolean|null);

                /** PauseZoneResponse previousStatus */
                previousStatus?: (plantos.admin.v1.Status|null);
            }

            /** Represents a PauseZoneResponse. */
            class PauseZoneResponse implements IPauseZoneResponse {

                /**
                 * Constructs a new PauseZoneResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IPauseZoneResponse);

                /** PauseZoneResponse success. */
                public success: boolean;

                /** PauseZoneResponse previousStatus. */
                public previousStatus: plantos.admin.v1.Status;

                /**
                 * Creates a new PauseZoneResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PauseZoneResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IPauseZoneResponse): plantos.admin.v1.PauseZoneResponse;

                /**
                 * Encodes the specified PauseZoneResponse message. Does not implicitly {@link plantos.admin.v1.PauseZoneResponse.verify|verify} messages.
                 * @param message PauseZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IPauseZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PauseZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.PauseZoneResponse.verify|verify} messages.
                 * @param message PauseZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IPauseZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PauseZoneResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PauseZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.PauseZoneResponse;

                /**
                 * Decodes a PauseZoneResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PauseZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.PauseZoneResponse;

                /**
                 * Verifies a PauseZoneResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PauseZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PauseZoneResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.PauseZoneResponse;

                /**
                 * Creates a plain object from a PauseZoneResponse message. Also converts values to other types if specified.
                 * @param message PauseZoneResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.PauseZoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PauseZoneResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for PauseZoneResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResumeZoneRequest. */
            interface IResumeZoneRequest {

                /** ResumeZoneRequest zoneId */
                zoneId?: (number|null);
            }

            /** Represents a ResumeZoneRequest. */
            class ResumeZoneRequest implements IResumeZoneRequest {

                /**
                 * Constructs a new ResumeZoneRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IResumeZoneRequest);

                /** ResumeZoneRequest zoneId. */
                public zoneId: number;

                /**
                 * Creates a new ResumeZoneRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResumeZoneRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IResumeZoneRequest): plantos.admin.v1.ResumeZoneRequest;

                /**
                 * Encodes the specified ResumeZoneRequest message. Does not implicitly {@link plantos.admin.v1.ResumeZoneRequest.verify|verify} messages.
                 * @param message ResumeZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IResumeZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResumeZoneRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.ResumeZoneRequest.verify|verify} messages.
                 * @param message ResumeZoneRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IResumeZoneRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResumeZoneRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResumeZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ResumeZoneRequest;

                /**
                 * Decodes a ResumeZoneRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResumeZoneRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ResumeZoneRequest;

                /**
                 * Verifies a ResumeZoneRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResumeZoneRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResumeZoneRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ResumeZoneRequest;

                /**
                 * Creates a plain object from a ResumeZoneRequest message. Also converts values to other types if specified.
                 * @param message ResumeZoneRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ResumeZoneRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResumeZoneRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResumeZoneRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ResumeZoneResponse. */
            interface IResumeZoneResponse {

                /** ResumeZoneResponse success */
                success?: (boolean|null);
            }

            /** Represents a ResumeZoneResponse. */
            class ResumeZoneResponse implements IResumeZoneResponse {

                /**
                 * Constructs a new ResumeZoneResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IResumeZoneResponse);

                /** ResumeZoneResponse success. */
                public success: boolean;

                /**
                 * Creates a new ResumeZoneResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResumeZoneResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IResumeZoneResponse): plantos.admin.v1.ResumeZoneResponse;

                /**
                 * Encodes the specified ResumeZoneResponse message. Does not implicitly {@link plantos.admin.v1.ResumeZoneResponse.verify|verify} messages.
                 * @param message ResumeZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IResumeZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ResumeZoneResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ResumeZoneResponse.verify|verify} messages.
                 * @param message ResumeZoneResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IResumeZoneResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResumeZoneResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ResumeZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ResumeZoneResponse;

                /**
                 * Decodes a ResumeZoneResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ResumeZoneResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ResumeZoneResponse;

                /**
                 * Verifies a ResumeZoneResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ResumeZoneResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ResumeZoneResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ResumeZoneResponse;

                /**
                 * Creates a plain object from a ResumeZoneResponse message. Also converts values to other types if specified.
                 * @param message ResumeZoneResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ResumeZoneResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ResumeZoneResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ResumeZoneResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetZoneSettingsRequest. */
            interface IGetZoneSettingsRequest {

                /** GetZoneSettingsRequest zoneId */
                zoneId?: (number|null);
            }

            /** Represents a GetZoneSettingsRequest. */
            class GetZoneSettingsRequest implements IGetZoneSettingsRequest {

                /**
                 * Constructs a new GetZoneSettingsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetZoneSettingsRequest);

                /** GetZoneSettingsRequest zoneId. */
                public zoneId: number;

                /**
                 * Creates a new GetZoneSettingsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetZoneSettingsRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IGetZoneSettingsRequest): plantos.admin.v1.GetZoneSettingsRequest;

                /**
                 * Encodes the specified GetZoneSettingsRequest message. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsRequest.verify|verify} messages.
                 * @param message GetZoneSettingsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetZoneSettingsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetZoneSettingsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsRequest.verify|verify} messages.
                 * @param message GetZoneSettingsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetZoneSettingsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetZoneSettingsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetZoneSettingsRequest;

                /**
                 * Decodes a GetZoneSettingsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetZoneSettingsRequest;

                /**
                 * Verifies a GetZoneSettingsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetZoneSettingsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetZoneSettingsRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetZoneSettingsRequest;

                /**
                 * Creates a plain object from a GetZoneSettingsRequest message. Also converts values to other types if specified.
                 * @param message GetZoneSettingsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetZoneSettingsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetZoneSettingsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetZoneSettingsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a GetZoneSettingsResponse. */
            interface IGetZoneSettingsResponse {

                /** GetZoneSettingsResponse settings */
                settings?: (plantos.admin.v1.IZoneSettings|null);
            }

            /** Represents a GetZoneSettingsResponse. */
            class GetZoneSettingsResponse implements IGetZoneSettingsResponse {

                /**
                 * Constructs a new GetZoneSettingsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IGetZoneSettingsResponse);

                /** GetZoneSettingsResponse settings. */
                public settings?: (plantos.admin.v1.IZoneSettings|null);

                /**
                 * Creates a new GetZoneSettingsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetZoneSettingsResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IGetZoneSettingsResponse): plantos.admin.v1.GetZoneSettingsResponse;

                /**
                 * Encodes the specified GetZoneSettingsResponse message. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsResponse.verify|verify} messages.
                 * @param message GetZoneSettingsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IGetZoneSettingsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetZoneSettingsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.GetZoneSettingsResponse.verify|verify} messages.
                 * @param message GetZoneSettingsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IGetZoneSettingsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetZoneSettingsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.GetZoneSettingsResponse;

                /**
                 * Decodes a GetZoneSettingsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.GetZoneSettingsResponse;

                /**
                 * Verifies a GetZoneSettingsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetZoneSettingsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetZoneSettingsResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.GetZoneSettingsResponse;

                /**
                 * Creates a plain object from a GetZoneSettingsResponse message. Also converts values to other types if specified.
                 * @param message GetZoneSettingsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.GetZoneSettingsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetZoneSettingsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for GetZoneSettingsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an UpdateZoneSettingsRequest. */
            interface IUpdateZoneSettingsRequest {

                /** UpdateZoneSettingsRequest settings */
                settings?: (plantos.admin.v1.IZoneSettings|null);
            }

            /** Represents an UpdateZoneSettingsRequest. */
            class UpdateZoneSettingsRequest implements IUpdateZoneSettingsRequest {

                /**
                 * Constructs a new UpdateZoneSettingsRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IUpdateZoneSettingsRequest);

                /** UpdateZoneSettingsRequest settings. */
                public settings?: (plantos.admin.v1.IZoneSettings|null);

                /**
                 * Creates a new UpdateZoneSettingsRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UpdateZoneSettingsRequest instance
                 */
                public static create(properties?: plantos.admin.v1.IUpdateZoneSettingsRequest): plantos.admin.v1.UpdateZoneSettingsRequest;

                /**
                 * Encodes the specified UpdateZoneSettingsRequest message. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsRequest.verify|verify} messages.
                 * @param message UpdateZoneSettingsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IUpdateZoneSettingsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UpdateZoneSettingsRequest message, length delimited. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsRequest.verify|verify} messages.
                 * @param message UpdateZoneSettingsRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IUpdateZoneSettingsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UpdateZoneSettingsRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UpdateZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.UpdateZoneSettingsRequest;

                /**
                 * Decodes an UpdateZoneSettingsRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UpdateZoneSettingsRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.UpdateZoneSettingsRequest;

                /**
                 * Verifies an UpdateZoneSettingsRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UpdateZoneSettingsRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UpdateZoneSettingsRequest
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.UpdateZoneSettingsRequest;

                /**
                 * Creates a plain object from an UpdateZoneSettingsRequest message. Also converts values to other types if specified.
                 * @param message UpdateZoneSettingsRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.UpdateZoneSettingsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UpdateZoneSettingsRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UpdateZoneSettingsRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an UpdateZoneSettingsResponse. */
            interface IUpdateZoneSettingsResponse {

                /** UpdateZoneSettingsResponse success */
                success?: (boolean|null);

                /** UpdateZoneSettingsResponse updatedSettings */
                updatedSettings?: (plantos.admin.v1.IZoneSettings|null);
            }

            /** Represents an UpdateZoneSettingsResponse. */
            class UpdateZoneSettingsResponse implements IUpdateZoneSettingsResponse {

                /**
                 * Constructs a new UpdateZoneSettingsResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IUpdateZoneSettingsResponse);

                /** UpdateZoneSettingsResponse success. */
                public success: boolean;

                /** UpdateZoneSettingsResponse updatedSettings. */
                public updatedSettings?: (plantos.admin.v1.IZoneSettings|null);

                /**
                 * Creates a new UpdateZoneSettingsResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns UpdateZoneSettingsResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IUpdateZoneSettingsResponse): plantos.admin.v1.UpdateZoneSettingsResponse;

                /**
                 * Encodes the specified UpdateZoneSettingsResponse message. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsResponse.verify|verify} messages.
                 * @param message UpdateZoneSettingsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IUpdateZoneSettingsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified UpdateZoneSettingsResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.UpdateZoneSettingsResponse.verify|verify} messages.
                 * @param message UpdateZoneSettingsResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IUpdateZoneSettingsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an UpdateZoneSettingsResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns UpdateZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.UpdateZoneSettingsResponse;

                /**
                 * Decodes an UpdateZoneSettingsResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns UpdateZoneSettingsResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.UpdateZoneSettingsResponse;

                /**
                 * Verifies an UpdateZoneSettingsResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an UpdateZoneSettingsResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns UpdateZoneSettingsResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.UpdateZoneSettingsResponse;

                /**
                 * Creates a plain object from an UpdateZoneSettingsResponse message. Also converts values to other types if specified.
                 * @param message UpdateZoneSettingsResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.UpdateZoneSettingsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this UpdateZoneSettingsResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for UpdateZoneSettingsResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ZoneUpdate. */
            interface IZoneUpdate {

                /** ZoneUpdate zoneId */
                zoneId?: (number|null);

                /** ZoneUpdate zone */
                zone?: (plantos.admin.v1.IZone|null);

                /** ZoneUpdate changeType */
                changeType?: (plantos.admin.v1.ZoneUpdate.ChangeType|null);

                /** ZoneUpdate timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a ZoneUpdate. */
            class ZoneUpdate implements IZoneUpdate {

                /**
                 * Constructs a new ZoneUpdate.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IZoneUpdate);

                /** ZoneUpdate zoneId. */
                public zoneId: number;

                /** ZoneUpdate zone. */
                public zone?: (plantos.admin.v1.IZone|null);

                /** ZoneUpdate changeType. */
                public changeType: plantos.admin.v1.ZoneUpdate.ChangeType;

                /** ZoneUpdate timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new ZoneUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ZoneUpdate instance
                 */
                public static create(properties?: plantos.admin.v1.IZoneUpdate): plantos.admin.v1.ZoneUpdate;

                /**
                 * Encodes the specified ZoneUpdate message. Does not implicitly {@link plantos.admin.v1.ZoneUpdate.verify|verify} messages.
                 * @param message ZoneUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IZoneUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ZoneUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.ZoneUpdate.verify|verify} messages.
                 * @param message ZoneUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IZoneUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ZoneUpdate message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ZoneUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ZoneUpdate;

                /**
                 * Decodes a ZoneUpdate message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ZoneUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ZoneUpdate;

                /**
                 * Verifies a ZoneUpdate message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ZoneUpdate message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ZoneUpdate
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ZoneUpdate;

                /**
                 * Creates a plain object from a ZoneUpdate message. Also converts values to other types if specified.
                 * @param message ZoneUpdate
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ZoneUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ZoneUpdate to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ZoneUpdate
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ZoneUpdate {

                /** ChangeType enum. */
                enum ChangeType {
                    CHANGE_TYPE_UNSPECIFIED = 0,
                    CHANGE_TYPE_STATUS = 1,
                    CHANGE_TYPE_STATISTICS = 2,
                    CHANGE_TYPE_WATERED = 3,
                    CHANGE_TYPE_SETTINGS = 4
                }
            }

            /** Properties of a ModuleUpdate. */
            interface IModuleUpdate {

                /** ModuleUpdate moduleId */
                moduleId?: (number|null);

                /** ModuleUpdate module */
                module?: (plantos.admin.v1.IModule|null);

                /** ModuleUpdate changeType */
                changeType?: (plantos.admin.v1.ModuleUpdate.ChangeType|null);

                /** ModuleUpdate timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a ModuleUpdate. */
            class ModuleUpdate implements IModuleUpdate {

                /**
                 * Constructs a new ModuleUpdate.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IModuleUpdate);

                /** ModuleUpdate moduleId. */
                public moduleId: number;

                /** ModuleUpdate module. */
                public module?: (plantos.admin.v1.IModule|null);

                /** ModuleUpdate changeType. */
                public changeType: plantos.admin.v1.ModuleUpdate.ChangeType;

                /** ModuleUpdate timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new ModuleUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ModuleUpdate instance
                 */
                public static create(properties?: plantos.admin.v1.IModuleUpdate): plantos.admin.v1.ModuleUpdate;

                /**
                 * Encodes the specified ModuleUpdate message. Does not implicitly {@link plantos.admin.v1.ModuleUpdate.verify|verify} messages.
                 * @param message ModuleUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IModuleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ModuleUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.ModuleUpdate.verify|verify} messages.
                 * @param message ModuleUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IModuleUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ModuleUpdate message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ModuleUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ModuleUpdate;

                /**
                 * Decodes a ModuleUpdate message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ModuleUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ModuleUpdate;

                /**
                 * Verifies a ModuleUpdate message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ModuleUpdate message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ModuleUpdate
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ModuleUpdate;

                /**
                 * Creates a plain object from a ModuleUpdate message. Also converts values to other types if specified.
                 * @param message ModuleUpdate
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ModuleUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ModuleUpdate to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ModuleUpdate
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace ModuleUpdate {

                /** ChangeType enum. */
                enum ChangeType {
                    CHANGE_TYPE_UNSPECIFIED = 0,
                    CHANGE_TYPE_STATUS = 1,
                    CHANGE_TYPE_BATTERY = 2,
                    CHANGE_TYPE_ZONES = 3,
                    CHANGE_TYPE_CONNECTED = 4,
                    CHANGE_TYPE_DISCONNECTED = 5
                }
            }

            /** Properties of a StatisticsUpdate. */
            interface IStatisticsUpdate {

                /** StatisticsUpdate zoneId */
                zoneId?: (number|null);

                /** StatisticsUpdate updatedStatistics */
                updatedStatistics?: (plantos.admin.v1.IStatistic[]|null);

                /** StatisticsUpdate timestamp */
                timestamp?: (google.protobuf.ITimestamp|null);
            }

            /** Represents a StatisticsUpdate. */
            class StatisticsUpdate implements IStatisticsUpdate {

                /**
                 * Constructs a new StatisticsUpdate.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IStatisticsUpdate);

                /** StatisticsUpdate zoneId. */
                public zoneId: number;

                /** StatisticsUpdate updatedStatistics. */
                public updatedStatistics: plantos.admin.v1.IStatistic[];

                /** StatisticsUpdate timestamp. */
                public timestamp?: (google.protobuf.ITimestamp|null);

                /**
                 * Creates a new StatisticsUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns StatisticsUpdate instance
                 */
                public static create(properties?: plantos.admin.v1.IStatisticsUpdate): plantos.admin.v1.StatisticsUpdate;

                /**
                 * Encodes the specified StatisticsUpdate message. Does not implicitly {@link plantos.admin.v1.StatisticsUpdate.verify|verify} messages.
                 * @param message StatisticsUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IStatisticsUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified StatisticsUpdate message, length delimited. Does not implicitly {@link plantos.admin.v1.StatisticsUpdate.verify|verify} messages.
                 * @param message StatisticsUpdate message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IStatisticsUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a StatisticsUpdate message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns StatisticsUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.StatisticsUpdate;

                /**
                 * Decodes a StatisticsUpdate message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns StatisticsUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.StatisticsUpdate;

                /**
                 * Verifies a StatisticsUpdate message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a StatisticsUpdate message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns StatisticsUpdate
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.StatisticsUpdate;

                /**
                 * Creates a plain object from a StatisticsUpdate message. Also converts values to other types if specified.
                 * @param message StatisticsUpdate
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.StatisticsUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this StatisticsUpdate to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for StatisticsUpdate
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an ErrorResponse. */
            interface IErrorResponse {

                /** ErrorResponse code */
                code?: (plantos.admin.v1.ErrorCode|null);

                /** ErrorResponse message */
                message?: (string|null);

                /** ErrorResponse requestType */
                requestType?: (string|null);
            }

            /** Represents an ErrorResponse. */
            class ErrorResponse implements IErrorResponse {

                /**
                 * Constructs a new ErrorResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: plantos.admin.v1.IErrorResponse);

                /** ErrorResponse code. */
                public code: plantos.admin.v1.ErrorCode;

                /** ErrorResponse message. */
                public message: string;

                /** ErrorResponse requestType. */
                public requestType: string;

                /**
                 * Creates a new ErrorResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ErrorResponse instance
                 */
                public static create(properties?: plantos.admin.v1.IErrorResponse): plantos.admin.v1.ErrorResponse;

                /**
                 * Encodes the specified ErrorResponse message. Does not implicitly {@link plantos.admin.v1.ErrorResponse.verify|verify} messages.
                 * @param message ErrorResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: plantos.admin.v1.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link plantos.admin.v1.ErrorResponse.verify|verify} messages.
                 * @param message ErrorResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: plantos.admin.v1.IErrorResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ErrorResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ErrorResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): plantos.admin.v1.ErrorResponse;

                /**
                 * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ErrorResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): plantos.admin.v1.ErrorResponse;

                /**
                 * Verifies an ErrorResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ErrorResponse
                 */
                public static fromObject(object: { [k: string]: any }): plantos.admin.v1.ErrorResponse;

                /**
                 * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
                 * @param message ErrorResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: plantos.admin.v1.ErrorResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ErrorResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ErrorResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** MessageType enum. */
            enum MessageType {
                MESSAGE_TYPE_UNSPECIFIED = 0,
                MSG_HELLO = 1,
                MSG_LIST_MODULES_REQUEST = 2,
                MSG_GET_MODULE_REQUEST = 3,
                MSG_LIST_ZONES_REQUEST = 4,
                MSG_GET_ZONE_REQUEST = 5,
                MSG_GET_STATISTICS_REQUEST = 6,
                MSG_WATER_ZONE_REQUEST = 7,
                MSG_PAUSE_ZONE_REQUEST = 8,
                MSG_RESUME_ZONE_REQUEST = 9,
                MSG_GET_ZONE_SETTINGS_REQUEST = 10,
                MSG_UPDATE_ZONE_SETTINGS_REQUEST = 11,
                MSG_WELCOME = 1001,
                MSG_LIST_MODULES_RESPONSE = 1002,
                MSG_GET_MODULE_RESPONSE = 1003,
                MSG_LIST_ZONES_RESPONSE = 1004,
                MSG_GET_ZONE_RESPONSE = 1005,
                MSG_GET_STATISTICS_RESPONSE = 1006,
                MSG_WATER_ZONE_RESPONSE = 1007,
                MSG_PAUSE_ZONE_RESPONSE = 1008,
                MSG_RESUME_ZONE_RESPONSE = 1009,
                MSG_GET_ZONE_SETTINGS_RESPONSE = 1010,
                MSG_UPDATE_ZONE_SETTINGS_RESPONSE = 1011,
                MSG_ZONE_UPDATE = 2001,
                MSG_MODULE_UPDATE = 2002,
                MSG_STATISTICS_UPDATE = 2003,
                MSG_ERROR_RESPONSE = 3001
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: Long;

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (Long|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: Long;

            /** Duration nanos. */
            public nanos: number;

            /**
             * Creates a new Duration instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Duration instance
             */
            public static create(properties?: google.protobuf.IDuration): google.protobuf.Duration;

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Duration message, length delimited. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @param message Duration message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDuration, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Duration;

            /**
             * Decodes a Duration message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Duration;

            /**
             * Verifies a Duration message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Duration message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Duration
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Duration;

            /**
             * Creates a plain object from a Duration message. Also converts values to other types if specified.
             * @param message Duration
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Duration, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Duration to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Duration
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}

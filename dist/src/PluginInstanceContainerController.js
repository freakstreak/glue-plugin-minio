"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PluginInstanceContainerController = void 0;
var DockerodeHelper = require("@gluestack/helpers").DockerodeHelper;
var PluginInstanceContainerController = (function () {
    function PluginInstanceContainerController(app, callerInstance) {
        this.status = "down";
        this.app = app;
        this.callerInstance = callerInstance;
        this.setStatus(this.callerInstance.gluePluginStore.get("status"));
        this.setPortNumber(this.callerInstance.gluePluginStore.get("port_number"));
        this.setConsolePortNumber(this.callerInstance.gluePluginStore.get("console_port_number"));
        this.setContainerId(this.callerInstance.gluePluginStore.get("container_id"));
    }
    PluginInstanceContainerController.prototype.getCallerInstance = function () {
        return this.callerInstance;
    };
    PluginInstanceContainerController.prototype.getEnv = function () {
        var minio_credentials = {
            username: "gluestack",
            password: "password"
        };
        if (!this.callerInstance.gluePluginStore.get("minio_credentials") || !this.callerInstance.gluePluginStore.get("minio_credentials").username)
            this.callerInstance.gluePluginStore.set("minio_credentials", minio_credentials);
        minio_credentials = this.callerInstance.gluePluginStore.get("minio_credentials");
        return {
            MINIO_ROOT_USER: minio_credentials.username,
            MINIO_ROOT_PASSWORD: minio_credentials.password
        };
    };
    PluginInstanceContainerController.prototype.getDockerJson = function () {
        return {
            Image: "minio/minio",
            HostConfig: {
                PortBindings: {
                    "9000/tcp": [
                        {
                            HostPort: this.getPortNumber(true).toString()
                        },
                    ],
                    "9001/tcp": [
                        {
                            HostPort: this.getConsolePortNumber(true).toString()
                        },
                    ]
                }
            },
            ExposedPorts: {
                "9000/tcp": {},
                "9001/tcp": {}
            },
            Cmd: [
                'server',
                '/data',
                '--console-address',
                ':9001'
            ]
        };
    };
    PluginInstanceContainerController.prototype.getStatus = function () {
        return this.status;
    };
    PluginInstanceContainerController.prototype.getPortNumber = function (returnDefault) {
        if (this.portNumber) {
            return this.portNumber;
        }
        if (returnDefault) {
            return 9001;
        }
    };
    PluginInstanceContainerController.prototype.getConsolePortNumber = function (returnDefault) {
        if (this.consolePortNumber) {
            return this.consolePortNumber;
        }
        if (returnDefault) {
            return 9100;
        }
    };
    PluginInstanceContainerController.prototype.getContainerId = function () {
        return this.containerId;
    };
    PluginInstanceContainerController.prototype.setStatus = function (status) {
        this.callerInstance.gluePluginStore.set("status", status || "down");
        return (this.status = status || "down");
    };
    PluginInstanceContainerController.prototype.setPortNumber = function (portNumber) {
        this.callerInstance.gluePluginStore.set("port_number", portNumber || null);
        return (this.portNumber = portNumber || null);
    };
    PluginInstanceContainerController.prototype.setConsolePortNumber = function (consolePortNumber) {
        this.callerInstance.gluePluginStore.set("console_port_number", consolePortNumber || null);
        return (this.consolePortNumber = consolePortNumber || null);
    };
    PluginInstanceContainerController.prototype.setContainerId = function (containerId) {
        this.callerInstance.gluePluginStore.set("container_id", containerId || null);
        return (this.containerId = containerId || null);
    };
    PluginInstanceContainerController.prototype.setDockerfile = function (dockerfile) {
        this.callerInstance.gluePluginStore.set("dockerfile", dockerfile || null);
        return (this.dockerfile = dockerfile || null);
    };
    PluginInstanceContainerController.prototype.getConfig = function () { };
    PluginInstanceContainerController.prototype.up = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ports, consolePorts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ports = this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
                        consolePorts = this.callerInstance.callerPlugin.gluePluginStore.get("console_ports") || [];
                        return [4, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    DockerodeHelper.getPort(this.getPortNumber(true), ports)
                                        .then(function (port) { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            DockerodeHelper.getPort(this.getConsolePortNumber(true), consolePorts)
                                                .then(function (consolePort) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    this.portNumber = port;
                                                    this.consolePortNumber = consolePort;
                                                    DockerodeHelper.up(this.getDockerJson(), this.getEnv(), this.portNumber, this.callerInstance.getName())
                                                        .then(function (_a) {
                                                        var status = _a.status, portNumber = _a.portNumber, containerId = _a.containerId;
                                                        DockerodeHelper.generateDockerFile(_this.getDockerJson(), _this.getEnv(), _this.callerInstance.getName());
                                                        _this.setStatus(status);
                                                        _this.setPortNumber(portNumber);
                                                        _this.setConsolePortNumber(consolePort);
                                                        _this.setContainerId(containerId);
                                                        ports.push(portNumber);
                                                        consolePorts.push(consolePort);
                                                        _this.callerInstance.callerPlugin.gluePluginStore.set("ports", ports);
                                                        _this.callerInstance.callerPlugin.gluePluginStore.set("console_ports", consolePorts);
                                                        console.log("\x1b[32m");
                                                        console.log("API: http://localhost:".concat(_this.getPortNumber()));
                                                        console.log("Console: http://localhost:".concat(_this.getConsolePortNumber(), "/ open in browser"));
                                                        console.log();
                                                        console.log("Credentials to login in minio console: ");
                                                        console.log("username: ".concat(_this.getEnv().MINIO_ROOT_USER));
                                                        console.log("password: ".concat(_this.getEnv().MINIO_ROOT_PASSWORD));
                                                        console.log("\x1b[0m");
                                                        return resolve(true);
                                                    })["catch"](function (e) {
                                                        return reject(e);
                                                    });
                                                    return [2];
                                                });
                                            }); })["catch"](function (e) {
                                                return reject(e);
                                            });
                                            return [2];
                                        });
                                    }); })["catch"](function (e) {
                                        return reject(e);
                                    });
                                    return [2];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.down = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ports, consolePorts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ports = this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
                        consolePorts = this.callerInstance.callerPlugin.gluePluginStore.get("console_ports") || [];
                        return [4, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    DockerodeHelper.down(this.getContainerId(), this.callerInstance.getName())
                                        .then(function () {
                                        _this.setStatus("down");
                                        var index = ports.indexOf(_this.getPortNumber());
                                        if (index !== -1) {
                                            ports.splice(index, 1);
                                        }
                                        _this.callerInstance.callerPlugin.gluePluginStore.set("ports", ports);
                                        var consoleIndex = consolePorts.indexOf(_this.getConsolePortNumber());
                                        if (consoleIndex !== -1) {
                                            consolePorts.splice(consoleIndex, 1);
                                        }
                                        _this.callerInstance.callerPlugin.gluePluginStore.set("console_ports", consolePorts);
                                        _this.setPortNumber(null);
                                        _this.setConsolePortNumber(null);
                                        _this.setContainerId(null);
                                        return resolve(true);
                                    })["catch"](function (e) {
                                        return reject(e);
                                    });
                                    return [2];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    return PluginInstanceContainerController;
}());
exports.PluginInstanceContainerController = PluginInstanceContainerController;
//# sourceMappingURL=PluginInstanceContainerController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    brokers: ['needed-owl-7746-us1-kafka.upstash.io:9092'],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: 'bmVlZGVkLW93bC03NzQ2JIrzdlq7f4kI_z9AIcYgPUKpl2Eyq3-Ky5AaqfBO2tc',
        password: 'ZTIwMDZkNzctZWM3OS00ZmI4LWIxYmUtZThiYThhZTRjM2Fi'
    },
    logLevel: kafkajs_1.logLevel.ERROR,
});
exports.default = kafka;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayed = void 0;
function delayed(ms = 1000, value = null) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
}
exports.delayed = delayed;

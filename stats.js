const os = require('os');
const log = require('./logger');

const Stats = new function () {
    const { freemem, totalmem } = os;

    this.newMem = () => {
        let Mem = {
            'free': this.memParse(freemem()),
            'total': this.memParse(totalmem())
        };

        Mem.usage = this.memUsage(Mem);

        return Mem;
    };

    this.memParse = (value) => {
        return parseInt(value / 1024 / 1024);
    };

    this.memUsage = (Mem) => {
        return Math.round((((Mem.total - Mem.free) / Mem.total) * 100));
    };

    this.get = () => {
        let Mem = this.newMem();

        return {
            'free': `${Mem.free} MB`,
            'total': `${Mem.total} MB`,
            'usage': `${Mem.usage}%`
        };
    };
};

setInterval(() => {
    let stats = Stats.get();

    console.clear();
    console.log('PC Stats:');
    console.table(stats);

    log(`${JSON.stringify(stats)}\n`);
},
    1000
);
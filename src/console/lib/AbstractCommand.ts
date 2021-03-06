// Copyright (c) 2017-2018, The Particl Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/particl/particl-market/blob/develop/LICENSE

/**
 * AbstractCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';

export interface Command {
    run(): Promise<void>;
}

export class AbstractCommand {

    public static command = 'make:command';
    public static description = 'description';

    public static async action(command: Command): Promise<void> {
        try {
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public context: any;

    constructor(context?: any) {
        this.context = _.cloneDeep(context);
    }

    public async run(): Promise<void> {
        console.log('You have to implement a run method!');
    }

}

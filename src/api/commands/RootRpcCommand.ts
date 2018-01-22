import { inject, named } from 'inversify';
import { RpcRequest } from '../requests/RpcRequest';
import { RpcCommandInterface } from './RpcCommandInterface';
import { validate, request } from '../../core/api/Validate';
import { Logger as LoggerType } from '../../core/Logger';
import { Types, Core, Targets } from '../../constants';
import {ProfileService} from '../services/ProfileService';

export class RootRpcCommand implements RpcCommandInterface<any> {
	public log: LoggerType;
	public commands: RpcCommandInterface<any>[];
	public name: string;
	public helpStr: string;

	constructor(
		commands: new () => RpcCommandInterface<any>,
		@inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
	) {
		this.log = new Logger(__filename);
		this.name = 'DefaultRootCommand';
		this.helpStr = 'DefaultRootCommand';
	}

	@validate()
    public async execute( @request(RpcRequest) data: RpcRequest): Promise<any> {
    	data.method = data.params.pop();
    	this.log.error(data.method);
    	for(const param of data.params) {
    		this.log.error(', ' + param);
    	}

        for(const command of this.commands) {
        	if(command.name === data.method) {

        	}
        }
    }

	public help(): string {
		let helpStr = this.helpStr;
		for(const command of this.commands) {
			helpStr = helpStr
			 + '\n' + command.help();
		}
		return helpStr;
	}
}

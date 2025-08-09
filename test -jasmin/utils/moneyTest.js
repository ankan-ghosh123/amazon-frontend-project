import { centToDoller } from "../../scripts/utils/money.js";
describe('test suit:formatCurrency',()=>{

it('convert cents into doller',()=>{
    expect(centToDoller(2000.5)).toEqual('20.01');
});
it('works with 0',()=>{
expect(centToDoller(0)).toEqual('0.00');
});
it('round up to nearest const',()=>{
expect(centToDoller(2000.5)).toEqual('20.01');
});
});
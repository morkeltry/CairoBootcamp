
%lang starknet
from starkware.cairo.common.cairo_builtins import HashBuiltin
const THIS_CONTRACT = 0x0769dac271462ee754e4e7f402c8e3a3f6602ec6b75c00e21afba703b82ab245;

const EMPIRIC_ORACLE_ADDRESS = 0x012fadd18ec1a23a160cc46981400160fbf4a7a5eed156c4669e39807265bcd4;
const KEY = 28556963469423460;
//  # str_to_felt("eth/usd")
const AGGREGATION_MODE = 120282243752302;
//  # str_to_felt("median")
 
@contract_interface
namespace IEmpiricOracle{
    func get_value(key : felt, aggregation_mode : felt) -> (
        value : felt,
        decimals : felt,
        last_updated_timestamp : felt,
        num_sources_aggregated : felt
    ){
    }
}


@view
func my_func{
    syscall_ptr : felt*,
    pedersen_ptr : HashBuiltin*,
    range_check_ptr
}() -> (value: felt){
    let (eth_price,
        decimals,
        last_updated_timestamp,
        num_sources_aggregated) = IEmpiricOracle.get_value(
            EMPIRIC_ORACLE_ADDRESS, KEY, AGGREGATION_MODE
        );
    // Your smart contract logic!
    return (eth_price, );
}


// Task:
// Develop logic of set balance and get balance methods
%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from openzeppelin.access.ownable import Ownable

@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(owner: felt) {
    Ownable.initializer(owner);
    return ();
}

// (internal) set owner
@external
func _set_owner{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}(amount: felt) {
    balance.write(amount);
    return ();
}

@external
func transfer_ownership{pedersen_ptr: HashBuiltin*, syscall_ptr: felt*, range_check_ptr}(new_owner: felt) {
    Ownable.assert_only_owner();

    Ownable.transfer_ownership(new_owner);
    return ();
}

// Define a storage variable.
@storage_var
func balance() -> (res: felt) {
}

// Returns the current owner.
@view
func get_owner{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}() -> (owner: felt) {
    let (res) = Ownable.owner();
    return  (res, );
}

// Returns the current balance.
@view
func get_balance{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}() -> (res: felt) {
    let res = balance.read();
    return  res;
}

// Sets the balance to amount
@external
func set_balance{
    syscall_ptr: felt*,
    pedersen_ptr: HashBuiltin*,
    range_check_ptr,
}(amount: felt) {
    balance.write(amount);
    return ();
}

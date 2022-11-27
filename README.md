# some Cairo exercises from Extropy.io

## Setup:

#### cairo-lang
```
sudo apt-get install libgmp-dev
pip3 install ecdsa fastecdsa sympy
pip3 install cairo-lang
```

[Protostar](https://docs.swmansion.com/protostar/docs/tutorials/installation)

If cairo-lang was already installed,
`protostar -v`
should give cairo-lang > v0.10.0. If not, then `pip3 install --upgrade cairo-lang`.

## To solve an exercise:

1. Run `$ protostar test test/test_ex*.cairo` to see a failing test.
2. Solve the exercise `exercise/ex*.cairo`
3. Run `$ protostar test test/test_ex*.cairo` to see a passing test.

**All tests should pass without any modification of the test files.**

**Hence you must only modify the `.cairo` files in the `/exercises/` directory.**
 

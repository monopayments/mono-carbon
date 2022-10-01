

  import { Contract, providers, utils, BigNumber } from "ethers";
  import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
  } from "./constants";


export const getEtherBalance = async (
    provider,
    address,
    contract = false
  ) => {
    try {
      // If the caller has set the `contract` boolean to true, retrieve the balance of
      // ether in the `exchange contract`, if it is set to false, retrieve the balance
      // of the user's address
      if (contract) {
        const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS);
        return balance;
      } else {
        const balance = await provider.getBalance(address);
        return balance;
      }
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  export const getCDTokensBalance = async (provider, address) => {
    try {
      const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        provider
      );
      const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address);
      return balanceOfCryptoDevTokens;
    } catch (err) {
      console.error(err);
    }
  };

  export const getLPTokensBalance = async (provider, address) => {
    try {
      const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        provider
      );
      const balanceOfLPTokens = await exchangeContract.balanceOf(address);
      return balanceOfLPTokens;
    } catch (err) {
      console.error(err);
    }
  };

  export const getReserveOfCDTokens = async (provider) => {
    try {
      const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        provider
      );
      const reserve = await exchangeContract.getReserve();
      return reserve;
    } catch (err) {
      console.error(err);
    }
  };

  export const addLiquidity = async (
    signer,
    addCDAmountWei,
    addEtherAmountWei
  ) => {
    try {
      // create a new instance of the token contract
      const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
      );
      // create a new instance of the exchange contract
      const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
      );
      // Because CD tokens are an ERC20, user would need to give the contract allowance
      // to take the required number CD tokens out of his contract
      let tx = await tokenContract.approve(
        EXCHANGE_CONTRACT_ADDRESS,
        addCDAmountWei.toString()
      );
      await tx.wait();
      // After the contract has the approval, add the ether and cd tokens in the liquidity
      tx = await exchangeContract.addLiquidity(addCDAmountWei, {
        value: addEtherAmountWei,
      });
      await tx.wait();
    } catch (err) {
      console.error(err);
    }
  };
  
  /**
   * calculateCD calculates the CD tokens that need to be added to the liquidity
   * given `_addEtherAmountWei` amount of ether
   */
  export const calculateCD = async (
    _addEther = "0",
    etherBalanceContract,
    cdTokenReserve
  ) => {
    // `_addEther` is a string, we need to convert it to a Bignumber before we can do our calculations
    // We do that using the `parseEther` function from `ethers.js`
    const _addEtherAmountWei = utils.parseEther(_addEther);
    // Ratio needs to be maintained when we add liquidty.
    // We need to let the user know for a specific amount of ether how many `CD` tokens
    // he can add so that the price impact is not large
    // The ratio we follow is (amount of Crypto Dev tokens to be added) / (Crypto Dev tokens balance) = (Eth that would be added) / (Eth reserve in the contract)
    // So by maths we get (amount of Crypto Dev tokens to be added) = (Eth that would be added * Crypto Dev tokens balance) / (Eth reserve in the contract)
    const cryptoDevTokenAmount = _addEtherAmountWei
      .mul(cdTokenReserve)
      .div(etherBalanceContract);
    return cryptoDevTokenAmount;
  };

  export const getAmountOfTokensReceivedFromSwap = async (
    _swapAmountWei,
    provider,
    ethSelected,
    ethBalance,
    reservedCD
  ) => {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      provider
    );
    let amountOfTokens;
    // If `Eth` is selected this means our input value is `Eth` which means our input amount would be
    // `_swapAmountWei`, the input reserve would be the `ethBalance` of the contract and output reserve
    // would be the `Crypto Dev` token reserve
    if (ethSelected) {
      amountOfTokens = await exchangeContract.getAmountOfTokens(
        _swapAmountWei,
        ethBalance,
        reservedCD
      );
    } else {
      // If `Eth` is not selected this means our input value is `Crypto Dev` tokens which means our input amount would be
      // `_swapAmountWei`, the input reserve would be the `Crypto Dev` token reserve of the contract and output reserve
      // would be the `ethBalance`
      amountOfTokens = await exchangeContract.getAmountOfTokens(
        _swapAmountWei,
        reservedCD,
        ethBalance
      );
    }
  
    return amountOfTokens;
  };
  
  /*
    swapTokens: Swaps `swapAmountWei` of Eth/Crypto Dev tokens with `tokenToBeReceivedAfterSwap` amount of Eth/Crypto Dev tokens.
  */
  export const swapTokens = async (
    signer,
    swapAmountWei,
    tokenToBeReceivedAfterSwap,
    ethSelected
  ) => {
    // Create a new instance of the exchange contract
    const exchangeContract = new Contract(
      EXCHANGE_CONTRACT_ADDRESS,
      EXCHANGE_CONTRACT_ABI,
      signer
    );
    const tokenContract = new Contract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ABI,
      signer
    );
    let tx;
    // If Eth is selected call the `ethToCryptoDevToken` function else
    // call the `cryptoDevTokenToEth` function from the contract
    // As you can see you need to pass the `swapAmount` as a value to the function because
    // it is the ether we are paying to the contract, instead of a value we are passing to the function
    if (ethSelected) {
      tx = await exchangeContract.ethToCryptoDevToken(
        tokenToBeReceivedAfterSwap,
        {
          value: swapAmountWei,
        }
      );
    } else {
      // User has to approve `swapAmountWei` for the contract because `Crypto Dev` token
      // is an ERC20
      tx = await tokenContract.approve(
        EXCHANGE_CONTRACT_ADDRESS,
        swapAmountWei.toString()
      );
      await tx.wait();
      // call cryptoDevTokenToEth function which would take in `swapAmountWei` of `Crypto Dev` tokens and would
      // send back `tokenToBeReceivedAfterSwap` amount of `Eth` to the user
      tx = await exchangeContract.cryptoDevTokenToEth(
        swapAmountWei,
        tokenToBeReceivedAfterSwap
      );
    }
    await tx.wait();
  };
/* global describe it before ethers */

const {
    getSelectors,
    FacetCutAction,
    removeSelectors,
    findAddressPositionInFacets
  } = require('../scripts/libraries/diamond.js')
  
  const { deployDiamond } = require('../scripts/deploy.js')
  
  const { assert } = require('chai')
  
  describe('DiamondTest', async function () {
    let diamondAddress
    let diamondCutFacet
    let diamondLoupeFacet
    let ownershipFacet
    let tx
    let receipt
    let result
    const addresses = []
  
    before(async function () {
      diamondAddress = await deployDiamond()
      diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', diamondAddress)
      diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', diamondAddress)
      ownershipFacet = await ethers.getContractAt('OwnershipFacet', diamondAddress)
    })



  it('should add test1 functions', async () => {
    const Test1Facet = await ethers.getContractFactory('V1Facet')
    const test1Facet = await Test1Facet.deploy()
    await test1Facet.deployed()
    addresses.push(test1Facet.address)
    const selectors = getSelectors(test1Facet)
    
    // add facet
    tx = await diamondCutFacet.diamondCut(
      [{
        facetAddress: test1Facet.address,
        action: FacetCutAction.Add,
        functionSelectors: selectors
      }],
      ethers.constants.AddressZero, '0x', { gasLimit: 800000 })
    receipt = await tx.wait()
    if (!receipt.status) {
      throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
    // loupe 
    // result = await diamondLoupeFacet.facetFunctionSelectors(test1Facet.address)
    // assert.sameMembers(result, selectors)




    let test1FacetA = await ethers.getContractAt('V1Facet', diamondAddress)
    let testTx = await test1FacetA.func1(2)
    testTx.wait()


    const Test2Facet = await ethers.getContractFactory('V2Facet')
    const test2Facet = await Test2Facet.deploy()
    await test2Facet.deployed()



    addresses.push(test2Facet.address)
    
    const _selectors = getSelectors(test2Facet)

    const V2Init = await ethers.getContractFactory('V2Init')
    const v2Init = await V2Init.deploy()
    await v2Init.deployed()
    console.log('v2Init deployed:', v2Init.address)

  let functionCall = v2Init.interface.encodeFunctionData('initV1',["5"])


    tx = await diamondCutFacet.diamondCut(
      [{
        facetAddress: test2Facet.address,
        action: FacetCutAction.Add,
        functionSelectors: _selectors
      }],
      v2Init.address, functionCall, { gasLimit: 800000 })
    receipt = await tx.wait()




    let test1FacetB = await ethers.getContractAt('V2Facet', diamondAddress)
    let testTx1 = await test1FacetB.func2() //view function
    assert.equal(testTx1.toString(), "11")

    
  })


})
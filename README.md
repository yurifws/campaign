# 🚀 Campaign - Decentralized Crowdfunding Platform

A crowdfunding platform built in Solidity that enables campaign creation, contribution collection, and transparent expense management through democratic voting on the Ethereum blockchain.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Contracts](#contracts)
- [Features](#features)
- [How to Use](#how-to-use)
- [API Functions](#api-functions)
- [Usage Flow](#usage-flow)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## 🎯 Overview

This project implements a decentralized crowdfunding system where:

- **Creators** can launch campaigns to raise funds
- **Contributors** can support campaigns and vote on how funds are spent
- **Transparency** is ensured through democratic voting for each expense

The key differentiator of this system is that raised funds are not released directly to the creator. Instead, the creator must create **spending requests** that need to be approved by the majority of contributors, preventing fraud and misuse of resources.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   CampaignFactory                       │
│  - Creates new Campaign contracts                       │
│  - Stores all deployed campaign addresses               │
└─────────────────┬───────────────────────────────────────┘
                  │ creates
                  ▼
┌─────────────────────────────────────────────────────────┐
│                      Campaign                           │
│  - Manages contributions                                │
│  - Handles spending requests                            │
│  - Controls voting and approvals                        │
└─────────────────────────────────────────────────────────┘
```

## 📄 Contracts

### CampaignFactory

Factory contract responsible for deploying new campaigns.

| Variable | Type | Description |
|----------|------|-------------|
| `deployedCampaigns` | `address[]` | Array of all deployed campaign addresses |

### Campaign

Main contract that manages a single crowdfunding campaign.

| Variable | Type | Description |
|----------|------|-------------|
| `manager` | `address` | Campaign creator address |
| `minimumContribution` | `uint` | Minimum amount to become a contributor |
| `approvers` | `mapping(address => bool)` | Mapping of contributor addresses |
| `approversCount` | `uint` | Total number of contributors |
| `requests` | `Request[]` | Array of spending requests |

### Request Struct

Structure representing a spending request.

| Field | Type | Description |
|-------|------|-------------|
| `description` | `string` | Description of the expense |
| `value` | `uint` | Amount in wei to be transferred |
| `recipient` | `address payable` | Address that will receive the funds |
| `complete` | `bool` | Whether the request has been finalized |
| `approvalCount` | `uint` | Number of approvals received |
| `approvals` | `mapping(address => bool)` | Mapping of who has approved |

## ✨ Features

### For Campaign Creators
- ✅ Create campaigns with custom minimum contribution
- ✅ Create spending requests with description, amount, and recipient
- ✅ Finalize approved requests to transfer funds

### For Contributors
- ✅ Contribute ETH to campaigns
- ✅ Vote on spending requests
- ✅ Democratic control over fund usage

### Security Features
- ✅ Only manager can create and finalize requests
- ✅ Contributors can only vote once per request
- ✅ Requests require >50% approval to be finalized
- ✅ Requests cannot be finalized twice

## 🚀 How to Use

### Prerequisites

- Node.js v14+
- npm or yarn
- Hardhat or Truffle
- MetaMask or similar wallet

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/campaign-crowdfunding.git
cd campaign-crowdfunding

# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Environment Setup

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_key_here
ETHERSCAN_API_KEY=your_etherscan_key_here
```

## 📚 API Functions

### CampaignFactory

#### `createCampaign(uint minimum)`
Creates a new campaign contract.

**Parameters:**
- `minimum` - Minimum contribution amount in wei

**Example:**
```javascript
// Create campaign with 0.01 ETH minimum
await factory.createCampaign(ethers.parseEther("0.01"));
```

#### `getDeployedCampaigns()`
Returns all deployed campaign addresses.

**Returns:** `address[]` - Array of campaign addresses

**Example:**
```javascript
const campaigns = await factory.getDeployedCampaigns();
console.log(campaigns); // ['0x123...', '0x456...']
```

---

### Campaign

#### `contribute()`
Contribute ETH to the campaign. Must send at least `minimumContribution`.

**Example:**
```javascript
await campaign.contribute({ value: ethers.parseEther("0.1") });
```

#### `createRequest(string description, uint value, address recipient)`
Create a new spending request. Only callable by manager.

**Parameters:**
- `description` - Purpose of the expense
- `value` - Amount in wei
- `recipient` - Address to receive funds

**Example:**
```javascript
await campaign.createRequest(
    "Buy equipment",
    ethers.parseEther("1.0"),
    "0x742d35Cc6634C0532925a3b844Bc9e7595f..."
);
```

#### `approveRequest(uint index)`
Approve a spending request. Only callable by contributors.

**Parameters:**
- `index` - Index of the request in the requests array

**Example:**
```javascript
await campaign.approveRequest(0);
```

#### `finalizeRequest(uint index)`
Finalize and execute an approved request. Only callable by manager.

**Parameters:**
- `index` - Index of the request

**Requirements:**
- More than 50% of contributors must have approved
- Request must not be already complete

**Example:**
```javascript
await campaign.finalizeRequest(0);
```

## 🔄 Usage Flow

```
1. DEPLOY
   └── Deploy CampaignFactory

2. CREATE CAMPAIGN
   └── Call createCampaign(minimumContribution)
       └── New Campaign contract is deployed

3. CONTRIBUTE
   └── Contributors call contribute() with ETH
       └── They become approvers with voting rights

4. CREATE REQUEST
   └── Manager calls createRequest()
       └── Specifies description, amount, recipient

5. APPROVE REQUEST
   └── Contributors call approveRequest()
       └── Each contributor can vote once

6. FINALIZE REQUEST
   └── Manager calls finalizeRequest()
       └── Requires >50% approval
       └── Funds are transferred to recipient
```

### Visual Flow

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐
│ Create  │ ──► │Contribute│ ──► │ Create  │ ──► │ Approve  │
│Campaign │     │          │     │ Request │     │ Request  │
└─────────┘     └──────────┘     └─────────┘     └────┬─────┘
                                                      │
                                                      ▼
                                                ┌──────────┐
                                                │ Finalize │
                                                │ Request  │
                                                └──────────┘
```

## 🔒 Security

### Implemented Protections

| Protection | Description |
|------------|-------------|
| Access Control | `restricted` modifier limits functions to manager |
| Double Voting Prevention | Mapping tracks who has already approved |
| Majority Requirement | Requests need >50% approval |
| Double Execution Prevention | `complete` flag prevents re-finalization |
| Contribution Tracking | Contributors can only be counted once |


## 🛠️ Tech Stack

- **Solidity** ^0.8.19
- **Hardhat** - Development environment
- **Ethers.js** - Ethereum library
- **Chai** - Testing framework

## 📁 Project Structure

```
campaign/
├── contracts/
│   └── Campaign.sol
├── test/
│   └── Campaign.test.js
└── README.md
```

## ⚠️ Disclaimer

This code is provided for educational purposes. Before deploying to mainnet:

- Conduct a professional security audit
- Test extensively on testnets
- Consider edge cases and potential attack vectors
- Implement additional security measures as needed

## 📞 Contact

Project Link: [https://github.com/yurifws/campaign](https://github.com/yurifws/campaign)

---

⭐ If this project helped you, please give it a star!

import { CategoryType } from '../generated/prisma'
import { prisma } from '../src/configs/prisma.config'
import {config} from 'dotenv'
config()

async function main() {
  console.log('🌱 Starting to seed fees...')

  // Clear existing fees data
  await prisma.fees.deleteMany({})
  await prisma.bank.deleteMany({})
  console.log('🗑️  Cleared existing fees data')

  // Define fee structure for different categories
  const feeData = [
    {
      categoryType: CategoryType.GENERAL,
      amount: 800.00,
    },
    {
      categoryType: CategoryType.EWS_OR_OBC,
      amount: 800.0,
    },
    {
      categoryType: CategoryType.SC_OR_ST,
      amount: 500.0,
    }
  ]

  // Create fee records - Fix: Use T[] instead of Array<T>
  const createdFees: Awaited<ReturnType<typeof prisma.fees.create>>[] = []
  for (const fee of feeData) {
    const createdFee = await prisma.fees.create({
      data: fee,
    })
    createdFees.push(createdFee)
  }

  // const bankDetails = {
  //   bankName: "INDUSIND BANK",
  //   accountNo: process.env.ACCOUNT_NO || "DummyAccountNo",
  //   ifscCode: "INDB0000382",
  // }

  // const createdBank = await prisma.bank.create({
  //   data: bankDetails,
  // })

  console.log('✅ Fee structure seeded successfully!')
  console.log('📊 Created fees:')
  createdFees.forEach(fee => {
    console.log(`   - ${fee.categoryType}: ₹${fee.amount}`)
  })
  // console.log('📊 Created bank:')
  // console.log(createdBank)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('🔌 Disconnected from database')
  })
  .catch(async (e) => {
    console.error('❌ Error seeding fees:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
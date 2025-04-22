// app/api/appeals/route.ts
import { NextResponse } from 'next/server'
import appealData from '../constants/appeals.json'
import { Appeal } from '../appeal/types'
import { writeFileSync } from 'fs'
import path from 'path'

let appeals: Appeal[] = [...appealData]

export async function GET() {
  return NextResponse.json(appeals)
}

export async function POST(request: Request) {
  const newAppeal: Appeal = await request.json()
  newAppeal.id = Math.max(...appeals.map(a => a.id)) + 1
  appeals.push(newAppeal)
  saveToFile()
  return NextResponse.json(newAppeal)
}

export async function PATCH(request: Request) {
  const { id, ...updateData } = await request.json()
  appeals = appeals.map(appeal => 
    appeal.id === id ? { ...appeal, ...updateData } : appeal
  )
  saveToFile()
  return NextResponse.json(appeals.find(a => a.id === id))
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  appeals = appeals.filter(appeal => appeal.id !== id)
  saveToFile()
  return NextResponse.json({ success: true })
}

function saveToFile() {
  const filePath = path.join(process.cwd(), 'app/constants/appeals.json')
  writeFileSync(filePath, JSON.stringify(appeals, null, 2))
}
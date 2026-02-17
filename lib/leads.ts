import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { docClient, LEADS_TABLE_NAME } from "./dynamodb";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  vehicleVin?: string;
  formType: string;
  message?: string;
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

export async function createLead(data: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = {
    id: randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  await docClient.send(
    new PutCommand({
      TableName: LEADS_TABLE_NAME,
      Item: lead,
    })
  );
  return lead;
}

export async function getAllLeads(): Promise<Lead[]> {
  const items: Lead[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new ScanCommand({
        TableName: LEADS_TABLE_NAME,
        ExclusiveStartKey: lastKey,
      })
    );
    items.push(...((result.Items as Lead[]) || []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

import {
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient, BLOG_TABLE_NAME } from "./dynamodb";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const items: BlogPost[] = [];
  let lastKey: Record<string, unknown> | undefined;

  do {
    const result = await docClient.send(
      new ScanCommand({
        TableName: BLOG_TABLE_NAME,
        ExclusiveStartKey: lastKey,
      })
    );
    items.push(...((result.Items as BlogPost[]) || []));
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);

  return items.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const result = await docClient.send(
    new GetCommand({ TableName: BLOG_TABLE_NAME, Key: { id } })
  );
  return (result.Item as BlogPost) || null;
}

export async function createBlogPost(post: BlogPost): Promise<void> {
  await docClient.send(
    new PutCommand({ TableName: BLOG_TABLE_NAME, Item: post })
  );
}

export async function updateBlogPost(
  id: string,
  updates: Partial<Omit<BlogPost, "id">>
): Promise<void> {
  const expressions: string[] = [];
  const names: Record<string, string> = {};
  const values: Record<string, unknown> = {};

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      const attrName = `#${key}`;
      const attrValue = `:${key}`;
      expressions.push(`${attrName} = ${attrValue}`);
      names[attrName] = key;
      values[attrValue] = value;
    }
  });

  if (expressions.length === 0) return;

  await docClient.send(
    new UpdateCommand({
      TableName: BLOG_TABLE_NAME,
      Key: { id },
      UpdateExpression: `SET ${expressions.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  );
}

export async function deleteBlogPost(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({ TableName: BLOG_TABLE_NAME, Key: { id } })
  );
}

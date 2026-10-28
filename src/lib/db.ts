import { Pool } from 'pg';

let globalPool: Pool | null = null;

export function getDbPool(): Pool {
  if (!globalPool) {
    globalPool = new Pool({
      host: process.env.DB_HOST || '194.164.151.17',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'hrsjm',
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return globalPool;
}

export async function saveComplaintDocuments(params: {
  ticketId: string;
  userId?: string;
  aadhaarFileName?: string;
  aadhaarFileUri?: string;
  handwrittenFileName?: string;
  handwrittenFileUri?: string;
  otherDeptFileName?: string;
  otherDeptFileUri?: string;
}) {
  const pool = getDbPool();
  const {
    ticketId,
    userId = 'eab7572d-61d3-4b84-9ed1-5071376bdf57',
    aadhaarFileName,
    aadhaarFileUri,
    handwrittenFileName,
    handwrittenFileUri,
    otherDeptFileName,
    otherDeptFileUri,
  } = params;

  if (aadhaarFileName && aadhaarFileUri) {
    const mime = aadhaarFileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/png';
    await pool.query(
      `INSERT INTO documents (
        id, user_id, document_name, document_type, file_name, original_file_name,
        mime_type, file_size, storage_path, file_url, related_entity_type, related_entity_id,
        description, is_archived, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, 'Aadhaar Card', 'SUPPORT_TICKET_ATTACHMENT',
        $2, $2, $3, $4, $5, $5, 'SUPPORT_TICKET', $6,
        'Aadhaar Card submitted with grievance', false, NOW(), NOW()
      )`,
      [userId, aadhaarFileName, mime, Math.round(aadhaarFileUri.length * 0.75), aadhaarFileUri, ticketId]
    );
  }

  if (handwrittenFileName && handwrittenFileUri) {
    const mime = handwrittenFileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/png';
    await pool.query(
      `INSERT INTO documents (
        id, user_id, document_name, document_type, file_name, original_file_name,
        mime_type, file_size, storage_path, file_url, related_entity_type, related_entity_id,
        description, is_archived, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, 'Handwritten Complaint', 'SUPPORT_TICKET_ATTACHMENT',
        $2, $2, $3, $4, $5, $5, 'SUPPORT_TICKET', $6,
        'Signed handwritten grievance letter submitted by citizen', false, NOW(), NOW()
      )`,
      [userId, handwrittenFileName, mime, Math.round(handwrittenFileUri.length * 0.75), handwrittenFileUri, ticketId]
    );
  }

  if (otherDeptFileName && otherDeptFileUri) {
    const mime = otherDeptFileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/png';
    await pool.query(
      `INSERT INTO documents (
        id, user_id, document_name, document_type, file_name, original_file_name,
        mime_type, file_size, storage_path, file_url, related_entity_type, related_entity_id,
        description, is_archived, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, 'Previous Report Copy', 'SUPPORT_TICKET_ATTACHMENT',
        $2, $2, $3, $4, $5, $5, 'SUPPORT_TICKET', $6,
        'Prior department report / acknowledgment copy', false, NOW(), NOW()
      )`,
      [userId, otherDeptFileName, mime, Math.round(otherDeptFileUri.length * 0.75), otherDeptFileUri, ticketId]
    );
  }
}


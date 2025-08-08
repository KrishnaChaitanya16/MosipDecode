-- 02_foreign_keys.sql
ALTER TABLE product_batches
  ADD CONSTRAINT fk_exporter
  FOREIGN KEY (exporter_id) REFERENCES users(id);

ALTER TABLE attachments
  ADD CONSTRAINT fk_batch_attachments
  FOREIGN KEY (batch_id) REFERENCES product_batches(id);

ALTER TABLE inspections
  ADD CONSTRAINT fk_inspection_batch
  FOREIGN KEY (batch_id) REFERENCES product_batches(id),
  ADD CONSTRAINT fk_inspector_user
  FOREIGN KEY (qa_agency_id) REFERENCES users(id);

ALTER TABLE verifiable_credentials
  ADD CONSTRAINT fk_vc_batch
  FOREIGN KEY (batch_id) REFERENCES product_batches(id),
  ADD CONSTRAINT fk_vc_issuer
  FOREIGN KEY (issuer_id) REFERENCES users(id);

ALTER TABLE verifications
  ADD CONSTRAINT fk_verifier_user
  FOREIGN KEY (verified_by) REFERENCES users(id);

ALTER TABLE audit_logs
  ADD CONSTRAINT fk_audit_user
  FOREIGN KEY (user_id) REFERENCES users(id);

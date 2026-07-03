INSERT INTO admins (name, email, hash_password)
SELECT seed.name, seed.email, seed.hash_password
FROM (
    VALUES
        ('Admin Principal', 'admin@inmidoc.test', '$2b$10$AVOHfbbqAMfKmqR3lsmmAuZlGMaXS3TVfM5SWvstIHOOVoMnWyWHK'),
        ('Soporte Inmidoc', 'soporte@inmidoc.test', '$2b$10$0C7s6mRB0q.5YLEQkrhTGu4LAWevB0OjW2fQuyoSDBtO.aZiKncCS'),
        ('Gestor Tramites', 'tramites@inmidoc.test', '$2b$10$4VM/7jx3TgOf/t/Y5jX7dufFKTmTUeQcTmH5.ZJu3BcG74.FnM4m.')
) AS seed(name, email, hash_password)
WHERE NOT EXISTS (
    SELECT 1
    FROM admins
    WHERE admins.email = seed.email
);

INSERT INTO institutions (name)
SELECT seed.name
FROM (
    VALUES
        ('Instituto Nacional de Migracion'),
        ('Secretaria de Relaciones Exteriores'),
        ('Registro Civil'),
        ('Servicio de Administracion Tributaria')
) AS seed(name)
WHERE NOT EXISTS (
    SELECT 1
    FROM institutions
    WHERE institutions.name = seed.name
);

INSERT INTO procedures (institution_id, name, description, keywords)
SELECT institutions.institution_id, seed.name, seed.description, seed.keywords::jsonb
FROM (
    VALUES
        (
            'Instituto Nacional de Migracion',
            'Renovacion de residencia temporal',
            'Tramite para renovar una tarjeta de residencia temporal vigente o vencida recientemente.',
            '["residencia", "renovacion", "temporal", "inm"]'
        ),
        (
            'Instituto Nacional de Migracion',
            'Canje de visa por tarjeta de residente',
            'Tramite para canjear una visa mexicana por tarjeta de residente temporal o permanente.',
            '["canje", "visa", "residente", "tarjeta"]'
        ),
        (
            'Secretaria de Relaciones Exteriores',
            'Expedicion de pasaporte ordinario',
            'Solicitud de pasaporte ordinario mexicano por primera vez o renovacion.',
            '["pasaporte", "sre", "mexicano", "renovacion"]'
        ),
        (
            'Registro Civil',
            'Copia certificada de acta de nacimiento',
            'Solicitud de copia certificada del acta de nacimiento para tramites oficiales.',
            '["acta", "nacimiento", "registro civil"]'
        ),
        (
            'Servicio de Administracion Tributaria',
            'Inscripcion al RFC',
            'Alta de persona fisica en el Registro Federal de Contribuyentes.',
            '["rfc", "sat", "persona fisica", "alta"]'
        )
) AS seed(institution_name, name, description, keywords)
INNER JOIN institutions ON institutions.name = seed.institution_name
WHERE NOT EXISTS (
    SELECT 1
    FROM procedures
    WHERE procedures.name = seed.name
      AND procedures.institution_id = institutions.institution_id
);

INSERT INTO requirement_documents (procedure_id, name)
SELECT procedures.procedure_id, seed.document_name
FROM (
    VALUES
        ('Renovacion de residencia temporal', 'Pasaporte vigente'),
        ('Renovacion de residencia temporal', 'Tarjeta de residencia actual'),
        ('Renovacion de residencia temporal', 'Comprobante de pago de derechos'),
        ('Canje de visa por tarjeta de residente', 'Visa mexicana vigente'),
        ('Canje de visa por tarjeta de residente', 'Formato migratorio multiple'),
        ('Canje de visa por tarjeta de residente', 'Comprobante de domicilio'),
        ('Expedicion de pasaporte ordinario', 'Acta de nacimiento certificada'),
        ('Expedicion de pasaporte ordinario', 'Identificacion oficial'),
        ('Expedicion de pasaporte ordinario', 'Comprobante de pago'),
        ('Copia certificada de acta de nacimiento', 'CURP'),
        ('Copia certificada de acta de nacimiento', 'Identificacion oficial'),
        ('Inscripcion al RFC', 'CURP'),
        ('Inscripcion al RFC', 'Comprobante de domicilio fiscal'),
        ('Inscripcion al RFC', 'Identificacion oficial vigente')
) AS seed(procedure_name, document_name)
INNER JOIN procedures ON procedures.name = seed.procedure_name
WHERE NOT EXISTS (
    SELECT 1
    FROM requirement_documents
    WHERE requirement_documents.procedure_id = procedures.procedure_id
      AND requirement_documents.name = seed.document_name
);

INSERT INTO tickets (admin_id, title, description, status)
SELECT admins.admin_id, seed.title, seed.description, seed.status
FROM (
    VALUES
        (
            'admin@inmidoc.test',
            'Actualizar requisitos de residencia temporal',
            'Validar si el comprobante de domicilio sigue siendo obligatorio para renovacion.',
            'open'
        ),
        (
            'soporte@inmidoc.test',
            'Corregir palabra clave en pasaporte',
            'Agregar palabra clave cita para mejorar busquedas del tramite de pasaporte.',
            'in_progress'
        ),
        (
            'tramites@inmidoc.test',
            'Revisar flujo de RFC',
            'Confirmar documentos necesarios para personas fisicas extranjeras.',
            'closed'
        )
) AS seed(admin_email, title, description, status)
LEFT JOIN admins ON admins.email = seed.admin_email
WHERE NOT EXISTS (
    SELECT 1
    FROM tickets
    WHERE tickets.title = seed.title
);

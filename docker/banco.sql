CREATE TABLE jogador (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    senha VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE quadra (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL UNIQUE,
    modalidade VARCHAR(50) NOT NULL,
    localizacao VARCHAR(150) NOT NULL
);

CREATE TABLE reserva (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    jogador_id INTEGER NOT NULL,
    quadra_id INTEGER NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    horario_fim TIMESTAMP WITH TIME ZONE NOT NULL,

    CONSTRAINT fk_reserva_jogador
        FOREIGN KEY (jogador_id)
        REFERENCES jogador (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reserva_quadra
        FOREIGN KEY (quadra_id)
        REFERENCES quadra (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT horario_valido
        CHECK (horario_fim > horario_inicio)      
);
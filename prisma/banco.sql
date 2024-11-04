INSERT INTO
    usuarios (nome, email, senha)
VALUES
    ('Alice', 'alice@example.com', 'senha123'),
    ('Bob', 'bob@example.com', 'senha123'),
    ('Charlie', 'charlie@example.com', 'senha123');


INSERT INTO
    imagens (tipo, tamanho, url, dados, descricao)
VALUES
    (
        'image/jpeg',
        204800,
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'Imagem da mesa de aventura.'
    ),
    (
        'image/jpeg',
        204800,
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'Imagem da mesa de estratégia.'
    ),
    (
        'image/jpeg',
        204800,
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'Imagem da mesa de RPG.'
    ),
    (
        'image/jpeg',
        204800,
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'https://ogimg.infoglobo.com.br/in/24798511-20a-1e5/FT1500A/690/nerdcast-rpg-cthulhu.jpg',
        'Imagem da mesa de cartas.'
    );

INSERT INTO
    mesas (nome, sistema, descricao, userId, imagemId)
VALUES
    (
        'Mesa de Aventura',
        'D&D',
        'Uma mesa para jogar Dungeons & Dragons.',
        1,
        1
    ),
    (
        'Mesa de Estratégia',
        'Warhammer',
        'Mesa dedicada a jogos de estratégia como Warhammer.',
        2,
        2
    ),
    (
        'Mesa de RPG',
        'Pathfinder',
        'Mesa para jogos de RPG como Pathfinder.',
        1,
        3
    ),
    (
        'Mesa de Cartas',
        'Magic',
        'Mesa para jogar Magic: The Gathering.',
        3,
        4
    );

INSERT INTO
    personagens (nickname, vidaMaxima, vidaAtual, userId, mesaId)
VALUES
    ('Personagem Exemplo', 100, 100, 1, 1);

INSERT INTO
    _mesausuarios (A, B)
VALUES
    (1, 1);
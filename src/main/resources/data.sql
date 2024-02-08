INSERT INTO VILLE (name)
VALUES ('Agadir'),
       ('Casablanca'),
       ('Rabat'),
       ('Fès'),
       ('Mohammédia');

INSERT INTO user (
    firstname, active,lastname, email, phone, password, competence, ville, role, outside, remarque, description
)
VALUES
    ("souhaila", 1, "jarmim", "souhaila@gmail.com", "+212 07199349224",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "",
     "Mohammédia", "ROLE_ADMIN",null, null, null),
    ("nihad", 1, "elmorabet", "nihad@gmail.com", "+212 0678901234",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "",
     "mohammédia", "ROLE_ASSISTANT",null, null, null),
    ("Sophie", 1, "Martin", "sophie.martin@gmail.com", "+212 0654321098",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2",
     "Intelligence Artificielle, Analyse de Données", "Agadir", "ROLE_FORMATEUR", 0,
     "Un formateur expert en IA et analyse de données.",
     "Je m'appelle Sophie Martin, et je suis passionnée par le domaine de l'Intelligence Artificielle (IA)
     et de l'analyse de données. Diplômée en statistiques de l'Université ABC, j'ai consacré ma carrière à la recherche
     et au développement d'algorithmes avancés pour l'analyse de données.\n\nMon expertise s'étend à la conception et
     à l'application de modèles IA pour résoudre des problèmes complexes. En plus de mes travaux de recherche, j'ai animé
     diverses formations et ateliers sur l'IA, partageant mes connaissances avec passion. Ma mission est d'inspirer
     et d'accompagner les apprenants dans le monde fascinant de l'IA et de l'analyse de données."),

    ("Alexandre", 1, "Dubois", "alexandre.dubois@gmail.com", "+212 0687654321",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "Développement Web, Java, Python", "Rabat",
     "ROLE_FORMATEUR", 0,
     "Un formateur expert en développement logiciel.",
     "Je m'appelle Alexandre Dubois, et je suis un formateur spécialisé dans le développement logiciel.
     Fort de ma maîtrise des langages de programmation tels que Java et Python, ainsi que du développement web
     tant en front-end qu'en back-end, j'ai acquis une expérience significative dans l'industrie informatique.\n\nMon parcours
     professionnel comprend des projets variés, allant de la création d'applications robustes à la conception d'interfaces
     utilisateur conviviales. Je suis passionné par le partage de mes connaissances et de mes compétences avec d'autres
     passionnés de programmation. Rejoignez mes cours pour explorer le monde du développement logiciel avec enthousiasme et engagement."),

    ("Karim", 1, "Omar", "karim.omar@gmail.com", "+212 0612345678",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "Développement Mobile, React Native, Flutter",
     " Rabat", "ROLE_FORMATEUR", 0,
     "Un formateur passionné par le développement mobile.",
     "Je m'appelle Karim Omar, et ma passion réside dans le développement mobile, notamment sur les plateformes React Native et Flutter.
     Mon expertise comprend la conception d'applications conviviales, la résolution de problèmes complexes et la mise en œuvre de solutions innovantes.\n\nAu cours
     de ma carrière, j'ai eu l'occasion de travailler sur des projets variés, de la création d'applications de qualité supérieure à la formation d'équipes de développeurs.
     Mon objectif est de guider les apprenants à travers le processus de développement mobile, en partageant des conseils pratiques et des techniques avancées."),

    ("Amina", 1, "Guerfi", "amina.guerfi@gmail.com", "+212 0678901234",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "Design Graphique, UI/UX Design", "Agadir",
     "ROLE_FORMATEUR", 1,
     "Un formateur créatif en design graphique et UI/UX.",
     "Je m'appelle Amina Guerfi, et je suis passionnée par le design graphique et l'expérience utilisateur (UI/UX).
     Mon parcours comprend des années d'expérience dans la création visuelle, du développement de concepts artistiques
     à la réalisation d'interfaces utilisateur esthétiques.\n\nEn tant que formatrice, je m'efforce de transmettre ma passion
     pour le design graphique en fournissant des cours engageants et axés sur la pratique. Rejoignez-moi pour explorer les principes du design,
     les outils créatifs et les meilleures pratiques en matière d'UI/UX."),

    ("Olivier", 1, "Lefevre", "olivier.lefevre@gmail.com", "+212 0654321098",
     "$2a$12$WMBBO/vTKg6Ubd8RF4I/puLZe56rIObrw/i1SsMU3U.6P3/78zku2", "Stratégies de Marketing, SEO, Publicité en ligne",
     "Agadir", "ROLE_FORMATEUR", 1,
     "Un formateur expert en marketing digital, compétent dans son domaine.",
     "Je m'appelle Olivier Lefevre, et je suis un formateur spécialisé dans le domaine du marketing digital et des stratégies en ligne.
     Mon parcours professionnel inclut la gestion de campagnes marketing réussies, l'optimisation des stratégies de médias sociaux
     et la création de contenus percutants.\n\nEn tant que formateur, je partage mes connaissances approfondies du marketing digital
     pour aider les apprenants à comprendre les dernières tendances, les meilleures pratiques et les outils essentiels.
     Rejoignez mes cours pour explorer le monde dynamique du marketing digital avec moi.") ;


INSERT INTO categorie (name) VALUES
                                 ('Développement Web'),
                                 ('Intelligence Artificielle'),
                                 ('Design Graphique et UX/UI'),
                                 ('Marketing Digital'),
                                 ('Développement Mobile');

INSERT INTO FORMATION (name, objectif, programme, heure, ville_id, cout, date, categorie_id)
VALUES
    ("Formation en Intelligence Artificielle",
     "Comprendre les concepts fondamentaux de l'IA. L'objectif de cette formation est de fournir aux participants une compréhension approfondie des principes clés de l'intelligence artificielle. En explorant des sujets tels que l'apprentissage machine, les réseaux de neurones et le traitement du langage naturel, les apprenants acquerront les compétences nécessaires pour aborder des problèmes complexes dans ce domaine en évolution rapide.",

     "Apprentissage machine, Réseaux de neurones, Traitement du langage naturel. Le programme de cette formation couvrira une gamme de sujets essentiels dans le domaine de l'intelligence artificielle. Les participants auront l'occasion d'explorer en profondeur des concepts tels que l'apprentissage machine pour l'analyse des données, les réseaux de neurones pour la reconnaissance de motifs et le traitement du langage naturel pour l'interaction homme-machine. À travers des sessions pratiques et des études de cas, les apprenants appliqueront ces connaissances pour
      résoudre des problèmes du monde réel.",105, 2 , 7000, "2024-02-04", 1
    ),

    ("Formation UX/UI Design",
     "Créer des expériences utilisateur exceptionnelles. Cette formation vise à équiper les participants des compétences nécessaires pour concevoir des interfaces utilisateur intuitives et esthétiques. En mettant l'accent sur les principes de conception centrée sur l'utilisateur, les participants apprendront à créer des produits numériques qui répondent aux besoins et aux attentes de leurs utilisateurs.",

     "Principes de design, Wireframing, Prototypage, Tests utilisateurs. Le programme de cette formation couvrira tous les aspects du design d'interface utilisateur. Les participants découvriront les principes fondamentaux du design centré sur l'utilisateur, apprendront à créer des wireframes et des prototypes interactifs, et acquerront les compétences nécessaires pour mener des tests utilisateurs efficaces. À travers des projets pratiques et des exercices de conception, les apprenants développeront une compréhension approfondie des meilleures pratiques en matière de conception d'expérience utilisateur."
        ,45, 3 , 15500, "2023-06-20", 3),

    ("Formation Marketing Digital Stratégique",
     "Élaborer des stratégies marketing efficaces. L'objectif de cette formation est de permettre aux participants de développer une compréhension approfondie du marketing numérique et d'élaborer des stratégies efficaces pour atteindre leurs objectifs commerciaux. En explorant des sujets tels que le référencement, le marketing sur les réseaux sociaux et l'analyse de données, les apprenants acquerront les compétences nécessaires pour élaborer et mettre en œuvre des campagnes marketing réussies.",

     "SEO, SEM, Réseaux sociaux, Analyse de données. Le programme de cette formation couvrira une variété de techniques et d'outils utilisés dans le marketing numérique. Les participants apprendront les tenants et les aboutissants du référencement, du marketing sur les réseaux sociaux, du marketing par moteur de recherche et de l'analyse de données. À travers des études de cas et des exercices pratiques, les apprenants acquerront une expérience pratique dans la mise en œuvre de stratégies marketing efficaces."
        ,25, 2 , 1600, "2022-05-12", 2
    );


INSERT INTO ENTREPRISE (address, email, name, phone, url, image)
VALUES
    ("123 Rue des Entrepreneurs, Casablanca", "contact@entreprise1.ma", "Entreprise 1", "+212 0654321098", "http://www.entreprise1.ma", null),
    ("456 Avenue des Innovateurs, Rabat", "info@entreprise2.ma", "Entreprise 2", "+212 0687654321", "http://www.entreprise2.ma",null),
    ("789 Boulevard de la Technologie, Marrakech", "info@entreprise3.ma", "Entreprise 3", "+212 0612345678", "http://www.entreprise3.ma",null),
    ("1010 Rue de l'Innovation, Fès", "contact@entreprise4.ma", "Entreprise 4", "+212 0678901234", "http://www.entreprise4.ma",null);




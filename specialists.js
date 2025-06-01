const specialists = [
    {
        id: 1,
        name: "Dr. Alfred Hitchcock",
        specialty: "Acessibilidade Digital",
        function: "acessibilidade-digital",
        city: "currais_novos",
        cityName: "Currais Novos",
        stars: 5,
        experience: "8 anos",
        description: "Especialista em tecnologias assistivas e desenvolvimento de interfaces acessíveis para pessoas com deficiência visual e auditiva.",
        certifications: ["Certified Professional in Accessibility Core Competencies", "UX Design Inclusivo"]
    },
    {
        id: 2,
        name: "Dr. David Lynch",
        specialty: "Inclusão no Varejo",
        function: "inclusao-varejo",
        city: "currais_novos",
        cityName: "Currais Novos",
        stars: 5,
        experience: "25 anos",
        description: "Consultor em estratégias de atendimento inclusivo para estabelecimentos comerciais e capacitação de equipes.",
        certifications: ["Gestão da Diversidade", "Atendimento Especializado PcD", "Lei Brasileira de Inclusão"]
    },
    {
        id: 3,
        name: "Profa. Mary Harron",
        specialty: "Treinamento Presencial",
        function: "treinamento",
        city: "currais_novos",
        cityName: "Currais Novos",
        stars: 4,
        experience: "10 anos",
        description: "Pedagoga especializada em metodologias de ensino inclusivo e desenvolvimento de conteúdos didáticos acessíveis.",
        certifications: ["Pedagogia Inclusiva", "Design Instrucional", "Gamificação Educacional"]
    },
    {
        id: 4,
        name: "Dr. Quentin Tarantino",
        specialty: "Acessibilidade Arquitetônica",
        function: "arquitetura",
        city: "lagoa_nova",
        cityName: "Lagoa Nova",
        stars: 5,
        experience: "15 anos",
        description: "Arquiteto especializado em projetos de acessibilidade e adequação de espaços comerciais às normas da ABNT.",
        certifications: ["Consultoria em Acessibilidade"]
    },
    {
        id: 5,
        name: "Dra. Tarkovsky",
        specialty: "Comunicação Inclusiva",
        function: "comunicacao",
        city: "mossoro",
        cityName: "Mossoró",
        stars: 4,
        experience: "6 anos",
        description: "Especialista em LIBRAS e comunicação alternativa, desenvolvendo estratégias de atendimento para pessoas surdas.",
        certifications: ["Intérprete de LIBRAS", "Comunicação Alternativa", "Audiologia Educacional"]
    },
    {
        id: 6,
        name: "Dr. Dario Argento",
        specialty: "psicólogo",
        function: "psicologo",
        city: "currais_novos",
        cityName: "Currais Novos",
        stars: 5,
        experience: "6 anos",
        description: "Diploma de graduação em Psicologia e Psicanálise",
        certifications: ["Psicanálise", "Diploma de graduação em Psicologia"]
    },
    {
        id: 7,
        name: "Dr. John Carpenter",
        specialty: "Inclusão no Varejo",
        function: "inclusao-varejo",
        city: "natal",
        cityName: "Natal",
        stars: 4,
        experience: "7 anos",
        description: "Consultora especializada em estratégias de vendas inclusivas e capacitação de equipes comerciais.",
        certifications: ["Vendas Inclusivas", "Gestão de Equipes", "Atendimento ao Cliente PcD"]
    },
    {
        id: 8,
        name: "Prof. Wes Anderson",
        specialty: "Treinamento Corporativo",
        function: "treinamento",
        city: "lagoa_nova",
        cityName: "Lagoa Nova",
        stars: 3,
        experience: "5 anos",
        description: "Educador especializado em programas de capacitação corporativa para inclusão e diversidade.",
        certifications: ["Educação Corporativa", "Diversidade e Inclusão", "Metodologias Ativas"]
    }
];

let filteredSpecialists = [...specialists];
let currentFilters = {
    function: 'all',
    city: 'all',
    stars: 'all',
    search: ''
};

// Get initials from name
function getInitials(name) {
    const titles = ["Dr.", "Dra.", "Profa.", "Prof.", "Sr.", "Sra."];
    let parts = name.trim().split(/\s+/);
    if (titles.includes(parts[0])) {
        parts.shift();
    }

    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Generate star display
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// Create specialist card HTML
function createSpecialistCard(specialist) {
    const initials = getInitials(specialist.name);
    const starsDisplay = generateStars(specialist.stars);
    const certificationsHTML = specialist.certifications
        .map(cert => `<span class="certification-tag">${cert}</span>`)
        .join('');

    return `
        <div class="specialist-card">
            <div class="specialist-header">
                <div class="specialist-avatar">${initials}</div>
                <h3 class="specialist-name">${specialist.name}</h3>
                <p class="specialist-specialty">${specialist.specialty}</p>
                <p class="specialist-city">${specialist.cityName}</p>
                <div class="specialist-stars">${starsDisplay}</div>
                <p class="specialist-experience">${specialist.experience} de experiência</p>
            </div>
            <p class="specialist-description">${specialist.description}</p>
            <div class="certifications-section">
                <h4>Certificações:</h4>
                <div class="certifications-list">
                    ${certificationsHTML}
                </div>
            </div>
        </div>
    `;
}

// Apply filters
function applyFilters() {
    filteredSpecialists = specialists.filter(specialist => {
        const searchMatch = currentFilters.search === '' || 
            specialist.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            specialist.specialty.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            specialist.description.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            specialist.certifications.some(cert => cert.toLowerCase().includes(currentFilters.search.toLowerCase()));

        const functionMatch = currentFilters.function === 'all' || specialist.function === currentFilters.function;
        const cityMatch = currentFilters.city === 'all' || specialist.city === currentFilters.city;
        const starsMatch = currentFilters.stars === 'all' || specialist.stars >= parseInt(currentFilters.stars);

        return searchMatch && functionMatch && cityMatch && starsMatch;
    });

    renderSpecialists(filteredSpecialists);
    updateSearchResults();
}

// Render specialists
function renderSpecialists(specialistsList) {
    const grid = document.getElementById('specialistsGrid');
    const noResults = document.getElementById('noResults');

    if (specialistsList.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        grid.innerHTML = specialistsList.map(createSpecialistCard).join('');
    }
}

// Update search results message
function updateSearchResults() {
    const searchResults = document.getElementById('searchResults');
    const activeFilters = [];

    if (currentFilters.function !== 'all') activeFilters.push('função');
    if (currentFilters.city !== 'all') activeFilters.push('cidade');
    if (currentFilters.stars !== 'all') activeFilters.push('avaliação');
    if (currentFilters.search !== '') activeFilters.push('busca');

    let message = `${filteredSpecialists.length} especialista(s) encontrado(s)`;
    if (activeFilters.length > 0) {
        message += ` com filtros ativos: ${activeFilters.join(', ')}`;
    }

    searchResults.innerHTML = message;
}

// Handle filter tag clicks
function handleFilterClick(button, filterType, filterValue) {
    const siblings = button.parentElement.querySelectorAll('.filter-tag');
    siblings.forEach(tag => tag.classList.remove('active'));

    button.classList.add('active');
    currentFilters[filterType] = filterValue;

    applyFilters();
}

// Handle search input
function handleSearch(searchTerm) {
    currentFilters.search = searchTerm;
    applyFilters();
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderSpecialists(specialists);
    updateSearchResults();

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        handleSearch(e.target.value);
    });

    document.querySelectorAll('.filter-tag').forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            const filterValue = this.getAttribute('data-filter');
            handleFilterClick(this, filterType, filterValue);
        });
    });
});

const sdgData = [
    { id: 1, color: '#E5243B', name: 'No Poverty', description: 'End poverty in all its forms everywhere. Ensure equal access to economic resources, basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance.'},
    { id: 2, color: '#DDA63A', name: 'Zero Hunger', description: 'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture. Ensure access to sufficient and nutritious food, especially for the poor and vulnerable, including infants. Promote sustainable agricultural practices, support small-scale farmers, and ensure equitable access to land, technology, and markets.'},
    { id: 3, color: '#4C9F38', name: 'Good Health and Well-being', description: 'Ensure healthy lives and promote well-being for all at all ages. Reduce the global maternal mortality ratio, end preventable deaths of newborns and children under 5 years of age, fight communicable diseases, reduce mortality from non-communicable diseases, and ensure universal access to sexual and reproductive health-care services.'},
    { id: 4, color: '#C5192D', name: 'Quality Education', description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Ensure that all girls and boys complete free, equitable, and quality primary and secondary education. Increase the number of youth and adults who have relevant skills for employment, decent jobs, and entrepreneurship.'},
    { id: 5, color: '#FF3A21', name: 'Gender Equality', description: 'Achieve gender equality and empower all women and girls. End all forms of discrimination and violence against women and girls. Ensure women\'s full and effective participation and equal opportunities for leadership at all levels of decision-making in political, economic, and public life.'},
    { id: 6, color: '#26BDE2', name: 'Clean Water and Sanitation', description: 'Ensure availability and sustainable management of water and sanitation for all. Achieve universal and equitable access to safe and affordable drinking water, improve water quality by reducing pollution, and ensure sustainable withdrawals and supply of freshwater.'},
    { id: 7, color: '#FCC30B', name: 'Affordable and Clean Energy', description: 'Ensure access to affordable, reliable, sustainable and modern energy for all. Increase the share of renewable energy in the global energy mix, improve energy efficiency, and enhance international cooperation to facilitate access to clean energy research and technology.'},
    { id: 8, color: '#A21942', name: 'Decent Work and Economic Growth', description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment, and decent work for all. Achieve higher levels of economic productivity through diversification, technological upgrading, and innovation. Promote policies that encourage entrepreneurship and job creation.'},
    { id: 9, color: '#FD6925', name: 'Industry, Innovation and Infrastructure', description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation. Develop quality, reliable, sustainable, and resilient infrastructure to support economic development and human well-being, with a focus on affordable and equitable access for all.'},
    { id: 10, color: '#DD1367', name: 'Reduced Inequality', description: 'Reduce inequality within and among countries. Ensure equal opportunity and reduce inequalities of outcome, including through eliminating discriminatory laws, policies, and practices, and promoting appropriate legislation, policies, and actions.'},
    { id: 11, color: '#FD9D24', name: 'Sustainable Cities and Communities', description: 'Make cities and human settlements inclusive, safe, resilient, and sustainable. Ensure access for all to adequate, safe, and affordable housing and basic services. Upgrade slums, enhance inclusive and sustainable urbanization, and build resilient infrastructure.'},
    { id: 12, color: '#BF8B2E', name: 'Responsible Consumption and Production', description: 'Ensure sustainable consumption and production patterns. Achieve the sustainable management and efficient use of natural resources. Reduce waste generation through prevention, reduction, recycling, and reuse. Encourage companies to adopt sustainable practices.'},
    { id: 13, color: '#3F7E44', name: 'Climate Action', description: 'Take urgent action to combat climate change and its impacts. Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters. Integrate climate change measures into national policies, strategies, and planning. Improve education and awareness-raising on climate change mitigation, adaptation, and impact reduction.'},
    { id: 14, color: '#0A97D9', name: 'Life Below Water', description: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development. Prevent and significantly reduce marine pollution, sustainably manage and protect marine and coastal ecosystems, and end overfishing and illegal fishing practices.'},
    { id: 15, color: '#56C02B', name: 'Life on Land', description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss. Ensure the conservation of mountain ecosystems, reduce the degradation of natural habitats, and protect threatened species.'},
    { id: 16, color: '#00689D', name: 'Peace, Justice and Strong Institutions', description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels. Reduce violence, end abuse, exploitation, trafficking, and all forms of violence against and torture of children.'},
    { id: 17, color: '#19486A', name: 'Partnerships for the Goals', description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development. Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the sustainable development goals.'}
];

let selectedSDGIndex = null;

function drawSDGSegments(sdgData) {
    const ns = "http://www.w3.org/2000/svg";
    const chart = document.getElementById('sdg-chart');
    const radius = 17; // Radius of the circle
    let startAngle = 0;
    const anglePerSegment = 360 / sdgData.length;

    sdgData.forEach((sdg, index) => {
        const endAngle = startAngle + anglePerSegment;
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", describeArc(0, 0, radius, startAngle, endAngle));
        path.setAttribute("fill", sdg.color);
        path.setAttribute("stroke", "white");
        path.setAttribute("stroke-width", "0.1");
        path.setAttribute("data-index", index);
        path.addEventListener('mouseover', (event) => showSDGInfo(event, index));
        path.addEventListener('mouseout', () => hideTooltip());
        path.addEventListener('click', () => selectSDG(index));
        chart.appendChild(path);
        startAngle = endAngle;
    });
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var innerRadius = radius * 0.85;  // Adjust inner radius to create a gap
    var outerRadius = radius;

    var startOuter = polarToCartesian(x, y, outerRadius, endAngle - 0.1); // Subtract small value for gap
    var endOuter = polarToCartesian(x, y, outerRadius, startAngle + 0.1); // Add small value for gap

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, arcSweep, 0, endOuter.x, endOuter.y,
        "L", x, y,
        "Z"
    ].join(" ");

    return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function showSDGInfo(event, index) {
    const sdgInfo = sdgData[index];
    document.getElementById('sdg-name').textContent = sdgInfo.name;
    document.getElementById('sdg-description').textContent = sdgInfo.description;
    document.getElementById('sdg-image').src = `sdg${sdgInfo.id}.png`; // Dynamic image path
    document.getElementById('sdg-image').style.display = 'block';
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
    tooltip.textContent = `SDG ${sdgInfo.id}`;
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

function selectSDG(index) {
    selectedSDGIndex = index;
    const sdgInfo = sdgData[index];
    document.getElementById('sdg-name').textContent = sdgInfo.name;
    document.getElementById('sdg-description').textContent = sdgInfo.description;
    document.getElementById('sdg-image').src = `sdg${sdgInfo.id}.png`; // Dynamic image path
    document.getElementById('sdg-image').style.display = 'block';
}

// Initialize the chart
drawSDGSegments(sdgData);

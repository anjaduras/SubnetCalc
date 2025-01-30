document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    const divideSubnetsBtn = document.getElementById("divideSubnetsBtn");

    // Event listener for "Get Subnet Mask"
    calculateBtn.addEventListener("click", () => {
        const [ip, cidr] = document.getElementById("cidrInput").value.trim().split('/');
        document.getElementById("subnetMaskDisplay").textContent = ip && cidr ? `Subnet Mask: ${getSubnetMask(cidr)}` : "Invalid CIDR notation.";
    });

    // Event listener for "Get Subnets"
    divideSubnetsBtn.addEventListener("click", () => {
        const [ip, cidr] = document.getElementById("cidrInput").value.trim().split('/');
        const subnetCount = parseInt(document.getElementById("subnetCountInput").value);

        if (ip && cidr && subnetCount > 0) {
            const newCidr = calculateNewCidr(cidr, subnetCount);
            const subnets = generateSubnets(ip, newCidr, subnetCount);
            document.getElementById("subnetsDisplay").innerHTML = subnets.join("<br>");
        } else {
            alert("Please enter valid CIDR and subnet count.");
        }
    });

    // Get subnet mask based on CIDR
    const getSubnetMask = (cidr) => [
        '255.0.0.0', '255.128.0.0', '255.192.0.0', '255.224.0.0', '255.240.0.0', '255.248.0.0',
        '255.252.0.0', '255.254.0.0', '255.255.0.0', '255.255.128.0', '255.255.192.0', '255.255.224.0',
        '255.255.240.0', '255.255.248.0', '255.255.252.0', '255.255.254.0', '255.255.255.0', '255.255.255.128',
        '255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248', '255.255.255.252',
        '255.255.255.254', '255.255.255.255'
    ][cidr - 1];

    // Calculate new CIDR for subnet division
    const calculateNewCidr = (cidr, subnetCount) => parseInt(cidr) + Math.ceil(Math.log2(subnetCount));

    // Generate subnets from CIDR
    const generateSubnets = (ip, newCidr, subnetCount) => {
        const ipNumber = ipToNumber(ip);
        const subnetSize = Math.pow(2, 32 - newCidr);
        return Array.from({ length: subnetCount }, (_, i) => {
            const start = numberToIp(ipNumber + i * subnetSize);
            const end = numberToIp(ipNumber + (i + 1) * subnetSize - 1);
            return `${start}/${newCidr} (Range: ${start} - ${end})`;
        });
    };

    // Convert IP to number
    const ipToNumber = (ip) => ip.split('.').reduce((num, octet) => (num << 8) + parseInt(octet), 0);

    // Convert number back to IP
    const numberToIp = (num) => [24, 16, 8, 0].map(shift => (num >> shift) & 255).join('.');
});

function ipToBinary(ip) {
    return ip.split('.').map(octet => {
        return ('00000000' + parseInt(octet).toString(2)).slice(-8);
    }).join('');
}

function binaryToIp(binary) {
    return binary.match(/.{8}/g).map(bin => parseInt(bin, 2)).join('.');
}

function calculateNetwork() {
    const ip = document.getElementById('ip').value;
    const subnetMask = document.getElementById('subnet').value;

    // Convert to binary
    const ipBinary = ipToBinary(ip);
    const maskBinary = ipToBinary(subnetMask);

    // Calculate the network address using bitwise AND
    const networkBinary = ipBinary.split('').map((bit, index) => {
        return maskBinary[index] === '1' ? bit : '0';
    }).join('');

    const networkAddress = binaryToIp(networkBinary);

    // Show result
    document.getElementById('result').innerHTML = `Network Address: ${networkAddress}`;
}
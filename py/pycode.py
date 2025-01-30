def ip_to_binary(ip):
    return ''.join(f'{int(octet):08b}' for octet in ip.split('.'))

def binary_to_ip(binary):
    return '.'.join(str(int(binary[i:i+8], 2)) for i in range(0, len(binary), 8))

def calculate_network(ip, subnet_mask):
    ip_binary = ip_to_binary(ip)
    mask_binary = ip_to_binary(subnet_mask)
    
    network_binary = ''.join('1' if ip_bit == mask_bit else '0' 
                             for ip_bit, mask_bit in zip(ip_binary, mask_binary))
    
    return binary_to_ip(network_binary)

# Example usage:
ip = "192.168.1.45"
subnet_mask = "255.255.255.0"
network_address = calculate_network(ip, subnet_mask)
print("Network Address:", network_address)
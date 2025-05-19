# Web Bluetooth API

The Web Bluetooth API allows web applications to communicate with Bluetooth Low Energy (BLE) devices.

## Important Notes

- This API requires user permission
- Works only over HTTPS (localhost is an exception)
- Check browser compatibility (Chrome, Edge)
- You might need to enable experimental web platform features

## Core Concepts

### GATT (Generic Attribute Profile)

GATT is the specification that defines how BLE devices communicate. It uses a hierarchical structure:

- **Services**: Collections of related functionality
- **Characteristics**: Individual data points within a service
- **Descriptors**: Additional information about characteristics

### Common Operations

1. **Request Device**
   ```javascript
   const device = await navigator.bluetooth.requestDevice({
     acceptAllDevices: true,
     // Or specify filters:
     // filters: [{ services: ['heart_rate'] }]
   });
   ```

2. **Connect to Device**
   ```javascript
   const server = await device.gatt?.connect();
   ```

3. **Get Service and Characteristic**
   ```javascript
   const service = await server?.getPrimaryService('YOUR_SERVICE_UUID');
   const characteristic = await service?.getCharacteristic('YOUR_CHARACTERISTIC_UUID');
   ```

4. **Read Characteristic**
   ```javascript
   const value = await characteristic.readValue();
   const decoder = new TextDecoder('utf-8');
   const text = decoder.decode(value);
   ```

5. **Write Characteristic**
   ```javascript
   const encoder = new TextEncoder();
   await characteristic.writeValue(encoder.encode('Hello'));
   ```

## Security Considerations

- User permission is required for security
- Only works in secure contexts (HTTPS)
- Devices must be in range and discoverable
- Some browsers may restrict access to certain services

## Debugging

- Use Chrome's Bluetooth Internals page (`chrome://bluetooth-internals`)
- Check browser console for errors
- Verify device compatibility
- Ensure proper permissions

## Resources

- [MDN Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [Web Bluetooth Specification](https://webbluetoothcg.github.io/web-bluetooth/)
- [Chrome Bluetooth Internals](chrome://bluetooth-internals)
- [BLE Device Simulator](https://github.com/WebBluetoothCG/ble-test-peripheral-android) 
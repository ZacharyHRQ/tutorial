'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Navigator {
    bluetooth: {
      requestDevice(options: { acceptAllDevices: boolean; filters?: { services: string[] }[] }): Promise<BluetoothDevice>;
    };
  }
  interface BluetoothDevice {
    gatt?: BluetoothRemoteGATTServer;
    addEventListener(event: string, listener: () => void): void;
  }
  interface BluetoothRemoteGATTServer {
    connect(): Promise<BluetoothRemoteGATTServer>;
    getPrimaryService(uuid: string): Promise<BluetoothRemoteGATTService>;
    connected: boolean;
    disconnect(): void;
  }
  interface BluetoothRemoteGATTService {
    getCharacteristic(uuid: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }
  interface BluetoothRemoteGATTCharacteristic {
    readValue(): Promise<DataView>;
    writeValue(value: BufferSource): Promise<void>;
  }
}

export default function WebBluetoothPage() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [characteristicValue, setCharacteristicValue] = useState<string | number>('');

  useEffect(() => {
    if (device) {
      device.addEventListener('gattserverdisconnected', () => {
        setStatusMessage('Device disconnected unexpectedly');
        setServer(null);
        setCharacteristic(null);
      });
    }
  }, [device]);

  const requestDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        // Uncomment and replace with your service UUID if needed
        // filters: [{ services: ['YOUR_SERVICE_UUID'] }]
      });
      setDevice(device);
      setStatusMessage('Device selected');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const connectToDevice = async () => {
    if (!device) return;
    try {
      const server = await device.gatt?.connect();
      if (server) {
        setServer(server);
      }
      setStatusMessage('Connected to device');
      // Uncomment and replace with your service and characteristic UUIDs if needed
      // const service = await server.getPrimaryService('YOUR_SERVICE_UUID');
      // const characteristic = await service.getCharacteristic('YOUR_CHARACTERISTIC_UUID');
      // setCharacteristic(characteristic);
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const readCharacteristic = async () => {
    if (!characteristic) return;
    try {
      const value = await characteristic.readValue();
      const decoder = new TextDecoder('utf-8');
      setCharacteristicValue(decoder.decode(value));
      setStatusMessage('Characteristic read');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const writeCharacteristic = async () => {
    if (!characteristic) return;
    try {
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode('Hello'));
      setStatusMessage('Characteristic written');
    } catch (error) {
      setStatusMessage(`Error: ${error}`);
    }
  };

  const disconnect = async () => {
    if (server?.connected) {
      server.disconnect();
      setStatusMessage('Disconnected');
      setServer(null);
      setCharacteristic(null);
    }
  };

  return (
    <div>
      <h1>Web Bluetooth API Demo</h1>
      <button onClick={requestDevice}>Request Bluetooth Device</button>
      <button onClick={connectToDevice} disabled={!device}>Connect to Device</button>
      <button onClick={readCharacteristic} disabled={!characteristic}>Read Characteristic</button>
      <button onClick={writeCharacteristic} disabled={!characteristic}>Write to Characteristic</button>
      <button onClick={disconnect} disabled={!server?.connected}>Disconnect</button>
      <p>Status: {statusMessage}</p>
      <p>Characteristic Value: {characteristicValue}</p>
    </div>
  );
}

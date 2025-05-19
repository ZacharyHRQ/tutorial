'use client';

import { useState, useEffect } from 'react';

interface BluetoothDevice {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
}

interface BluetoothCharacteristic {
  uuid: string;
  value?: DataView;
  properties: {
    read: boolean;
    write: boolean;
    notify: boolean;
  };
}

export default function WebBluetoothPage() {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null);
  const [characteristic, setCharacteristic] = useState<BluetoothCharacteristic | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to connect');
  const [characteristicValue, setCharacteristicValue] = useState<string>('');
  const [writeValue, setWriteValue] = useState<string>('');

  // Handle disconnection
  useEffect(() => {
    if (device) {
      const handleDisconnect = () => {
        setStatusMessage('Device disconnected');
        setDevice(null);
        setServer(null);
        setCharacteristic(null);
      };

      device.addEventListener('gattserverdisconnected', handleDisconnect);
      return () => {
        device.removeEventListener('gattserverdisconnected', handleDisconnect);
      };
    }
  }, [device]);

  const requestDevice = async () => {
    try {
      setStatusMessage('Requesting device...');
      
      // Request a device with any service
      const device = await navigator.bluetooth.requestDevice({
        // You can specify filters here, e.g.:
        // filters: [{ services: ['heart_rate'] }]
        acceptAllDevices: true
      });

      setDevice(device);
      setStatusMessage(`Device selected: ${device.name || device.id}`);
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to request device'}`);
    }
  };

  const connectToDevice = async () => {
    if (!device) return;

    try {
      setStatusMessage('Connecting to device...');
      const server = await device.gatt?.connect();
      setServer(server || null);
      setStatusMessage('Connected to device');

      // Optional: Get a specific service and characteristic
      // Replace these UUIDs with your device's service and characteristic UUIDs
      /*
      const service = await server?.getPrimaryService('YOUR_SERVICE_UUID');
      const characteristic = await service?.getCharacteristic('YOUR_CHARACTERISTIC_UUID');
      setCharacteristic(characteristic || null);
      */
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to connect'}`);
    }
  };

  const readCharacteristic = async () => {
    if (!characteristic) return;

    try {
      setStatusMessage('Reading characteristic...');
      const value = await characteristic.readValue();
      const decoder = new TextDecoder('utf-8');
      setCharacteristicValue(decoder.decode(value));
      setStatusMessage('Characteristic read successfully');
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to read characteristic'}`);
    }
  };

  const writeCharacteristic = async () => {
    if (!characteristic || !writeValue) return;

    try {
      setStatusMessage('Writing to characteristic...');
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(writeValue));
      setStatusMessage('Characteristic written successfully');
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to write characteristic'}`);
    }
  };

  const disconnect = async () => {
    if (!server) return;

    try {
      setStatusMessage('Disconnecting...');
      await server.disconnect();
      setStatusMessage('Disconnected');
    } catch (error) {
      setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Failed to disconnect'}`);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Web Bluetooth API Demo</h2>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-900 mb-2">Important Notes</h3>
        <ul className="list-disc list-inside text-yellow-700 space-y-2">
          <li>This API requires user permission</li>
          <li>Works only over HTTPS (localhost is an exception)</li>
          <li>Check browser compatibility (Chrome, Edge)</li>
          <li>You might need to enable experimental web platform features</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Connection */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">Device Connection</h3>
          
          <div className="space-y-2">
            <button
              onClick={requestDevice}
              disabled={!!device}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Request Bluetooth Device
            </button>

            <button
              onClick={connectToDevice}
              disabled={!device || !!server}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              Connect to Device
            </button>

            <button
              onClick={disconnect}
              disabled={!server}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              Disconnect
            </button>
          </div>

          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-medium">Status:</p>
            <p className="text-sm text-gray-600">{statusMessage}</p>
          </div>
        </div>

        {/* Characteristic Operations */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <h3 className="text-lg font-medium">Characteristic Operations</h3>
          
          <div className="space-y-2">
            <button
              onClick={readCharacteristic}
              disabled={!characteristic}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Read Characteristic
            </button>

            <div className="space-y-2">
              <input
                type="text"
                value={writeValue}
                onChange={(e) => setWriteValue(e.target.value)}
                placeholder="Value to write"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={writeCharacteristic}
                disabled={!characteristic || !writeValue}
                className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
              >
                Write to Characteristic
              </button>
            </div>
          </div>

          {characteristicValue && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-medium">Characteristic Value:</p>
              <p className="text-sm text-gray-600">{characteristicValue}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          About Web Bluetooth API
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-2">
          <li>Allows web apps to communicate with Bluetooth Low Energy devices</li>
          <li>Requires user permission for security</li>
          <li>Uses GATT (Generic Attribute Profile) for communication</li>
          <li>Supports reading, writing, and notifications</li>
        </ul>
      </div>
    </div>
  );
}

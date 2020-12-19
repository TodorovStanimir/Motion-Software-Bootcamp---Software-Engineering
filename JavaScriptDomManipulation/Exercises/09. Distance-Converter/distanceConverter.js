function attachEventsListeners() {
  const toMeter = { 'km': 1000, 'm': 1, 'cm': 0.01, 'mm': 0.001, 'mi': 1609.34, 'yrd': 0.9144, 'ft': 0.3048, 'in': 0.0254 };
  const fromMeterToOutputDistance = { 'km': 1 / 1000, 'm': 1, 'cm': 100, 'mm': 1000, 'mi': 1 / 1609.34, 'yrd': 1 / 0.9144, 'ft': 1 / 0.3048, 'in': 1 / 0.0254 };

  document.getElementById('convert').addEventListener('click', () => {
    const inputUnit = document.getElementById('inputUnits').value;
    const inputDistance = Number(document.getElementById('inputDistance').value);
    const outputUnit = document.getElementById('outputUnits').value;
    const outputDistance = inputDistance * toMeter[inputUnit] * fromMeterToOutputDistance[outputUnit];
    document.getElementById('outputDistance').value = outputDistance;
  });
}
var assert = require('assert');

var parsePath = require('../../labels/util/parse_path');

describe('parsePath', () => {
  it('detects core', () => {
    result = parsePath('homeassistant/core.py');
    assert.equal(result.core, true);
    assert.equal(result.type, 'core');
  });

  it('detects helpers', () => {
    result = parsePath('homeassistant/helpers/entity.py');
    assert.equal(result.core, true);
    assert.equal(result.type, 'helpers');
  });

  it('detects util', () => {
    result = parsePath('homeassistant/util/__init__.py');
    assert.equal(result.core, true);
    assert.equal(result.component, null);
    assert.equal(result.platform, null);
    assert.equal(result.type, 'util');
  });

  it('detects scripts', () => {
    result = parsePath('homeassistant/scripts/benchmark.py');
    assert.equal(result.core, true);
    assert.equal(result.component, null);
    assert.equal(result.platform, null);
    assert.equal(result.type, 'scripts');
  });

  it('detect component from component that is a single file', () => {
    result = parsePath('homeassistant/components/keyboard.py');
    assert.equal(result.core, false);
    assert.equal(result.component, 'keyboard');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'component');
  });

  it('detect component from component that is dir with init file', () => {
    result = parsePath('homeassistant/components/group/__init__.py');
    assert.equal(result.core, true);
    assert.equal(result.component, 'group');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'component');
  });

  it('detect component when not entity component', () => {
    result = parsePath('homeassistant/components/mqtt/server.py');
    assert.equal(result.core, true);
    assert.equal(result.component, 'mqtt');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'component');
  });

  it('detect core entity component', () => {
    result = parsePath('homeassistant/components/light/__init__.py');
    assert.equal(result.core, true);
    assert.equal(result.component, 'light');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'component');
  });

  it('detect core automation platform', () => {
    result = parsePath('homeassistant/components/automation/state.py');
    assert.equal(result.core, true);
    assert.equal(result.component, 'automation');
    assert.equal(result.platform, 'state');
    assert.equal(result.type, 'platform');
  });

  it('detect platform', () => {
    result = parsePath('homeassistant/components/light/hue.py');
    assert.equal(result.core, false);
    assert.equal(result.component, 'light');
    assert.equal(result.platform, 'hue');
    assert.equal(result.type, 'platform');
  });

  it('mark core services', () => {
    result = parsePath('homeassistant/components/services.yaml');
    assert.equal(result.core, false);
    assert.equal(result.component, null);
    assert.equal(result.platform, null);
    assert.equal(result.type, 'services');
  });

  it('mark component services', () => {
    result = parsePath('homeassistant/components/light/services.yaml');
    assert.equal(result.core, false);
    assert.equal(result.component, 'light');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'services');
  });

  it('detects component init', () => {
    result = parsePath('homeassistant/components/__init__.py');
    assert.equal(result.core, true);
    assert.equal(result.component, null);
    assert.equal(result.platform, null);
    assert.equal(result.type, 'core');
  });

  it('detect new component structure', () => {
    result = parsePath('homeassistant/components/hue/auth.py');
    assert.equal(result.core, false);
    assert.equal(result.component, 'hue');
    assert.equal(result.platform, null);
    assert.equal(result.type, 'component');
  });

  it('detect new component platform structure', () => {
    result = parsePath('homeassistant/components/hue/light.py');
    assert.equal(result.core, false);
    assert.equal(result.component, 'hue');
    assert.equal(result.platform, 'light');
    assert.equal(result.type, 'platform');
  });
});

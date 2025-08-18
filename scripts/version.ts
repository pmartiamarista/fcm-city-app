#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

interface PackageJson {
  version: string;
  [key: string]: unknown;
}

interface AppJson {
  expo: {
    version: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Read package.json and app.json
function readConfigs() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const appPath = path.join(process.cwd(), 'app.json');

  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const app = JSON.parse(fs.readFileSync(appPath, 'utf8'));
    return { pkg, app, packagePath, appPath };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error reading config files:', (error as Error).message);
    process.exit(1);
  }
}

// Write updated configs back to files
function writeConfigs(
  pkg: PackageJson,
  app: AppJson,
  packagePath: string,
  appPath: string,
) {
  try {
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    fs.writeFileSync(appPath, JSON.stringify(app, null, 2));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error writing config files:', (error as Error).message);
    process.exit(1);
  }
}

// Show current versions
function showVersions() {
  const { pkg, app } = readConfigs();
  // eslint-disable-next-line no-console
  console.log('📦 Package version:', pkg.version);
  // eslint-disable-next-line no-console
  console.log('📱 App version:', app.expo.version);
}

// Bump version by type
function bumpVersion(type: 'major' | 'minor' | 'patch') {
  const { pkg, app, packagePath, appPath } = readConfigs();

  const [major, minor, patch] = pkg.version.split('.').map(Number);
  let newVersion: string;

  switch (type) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
    default:
      // eslint-disable-next-line no-console
      console.error('❌ Invalid version type. Use: major, minor, or patch');
      process.exit(1);
  }

  // Update versions
  pkg.version = newVersion;
  app.expo.version = newVersion;

  // Write back to files
  writeConfigs(pkg, app, packagePath, appPath);

  // eslint-disable-next-line no-console
  console.log(`✅ Version bumped to ${newVersion}`);
}

// Main execution
const command = process.argv[2];

if (!command) {
  // eslint-disable-next-line no-console
  console.log('Usage: tsx scripts/version.ts <command>');
  // eslint-disable-next-line no-console
  console.log('Commands:');
  // eslint-disable-next-line no-console
  console.log('  show    - Display current versions');
  // eslint-disable-next-line no-console
  console.log('  major   - Bump major version');
  // eslint-disable-next-line no-console
  console.log('  minor   - Bump minor version');
  // eslint-disable-next-line no-console
  console.log('  patch   - Bump patch version');
  process.exit(1);
}

switch (command) {
  case 'show':
    showVersions();
    break;
  case 'major':
  case 'minor':
  case 'patch':
    bumpVersion(command);
    break;
  default:
    // eslint-disable-next-line no-console
    console.error('❌ Unknown command:', command);
    // eslint-disable-next-line no-console
    console.log('Use: show, major, minor, or patch');
    process.exit(1);
}

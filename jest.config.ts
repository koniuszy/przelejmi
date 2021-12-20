import nextJest from 'next/jest'

import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils'

import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest()

const customJestConfig: InitialOptionsTsJest = {
  testEnvironment: 'jsdom',
  cache: true,
  cacheDirectory: './cache/jest',
  testPathIgnorePatterns: ['/test'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^test/(.*)$': '<rootDir>/test/$1',
    '\\.(css)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
  },
}

export default createJestConfig(customJestConfig)

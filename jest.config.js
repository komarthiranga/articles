// jest.config.js  
module.exports = {  
    preset: 'ts-jest',  
    testEnvironment: 'jest-environment-jsdom',  
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure this path is correct  
    moduleNameMapper: {  
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',  
    },  
    transform: {  
        '^.+\\.(ts|tsx)$': 'ts-jest',  
    },  
};
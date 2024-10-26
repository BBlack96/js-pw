pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.1-noble' // Используем официальный Docker-образ Playwright
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Установка зависимостей
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test' // Запуск тестов
            }
        }
    }
}

pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.1-noble'
            args '-v /c/Users/demo/AppData/Local/Jenkins/.jenkins/workspace/test:/workspace -w /workspace'
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}

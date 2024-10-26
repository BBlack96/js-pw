pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.48.1-noble'
            args '-v /c/Users/demo/AppData/Local/Jenkins/.jenkins/workspace/test:/workspace -w /workspace'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test'
            }
        }
    }
}

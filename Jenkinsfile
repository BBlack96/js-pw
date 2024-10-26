pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.48.1-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}

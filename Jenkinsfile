pipeline {
    
    agent any

    tools {
      nodejs "NodeJs"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
              sh 'node -v'
              sh 'npm install'
            }
        }

        stage('Testing') {
          steps {
            sh 'npm prune'
            sh 'npm test'
          }
        }

    }
}

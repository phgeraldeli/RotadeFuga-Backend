pipeline {
    
    agent any

    tools {
      nodejs "nodejs"
    }

    stages {
        stage('Config') {
          steps {
            sh 'npm config ls'
            sh 'npm install -g yarn'
          }
        }

        stage('Install') {
            steps {
              sh 'yarn install'
            }
        }

        stage('Testing') {
          steps {
            echo 'Estou testando com Mocha!!!!!!'
          }
        }

        stage('Deploy') {
          when {
            anyOf {
              branch 'master'
            }
          }
          steps {
            sh 'chmod 755 src/script/deploy.sh'
            sh 'src/script/deploy.sh'
          }
        }

    }
}


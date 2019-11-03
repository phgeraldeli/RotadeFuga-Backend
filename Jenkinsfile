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
            deploy()
          }
        }

    }
}


def deploy() {
  sh 'ssh -tt root@18.191.40.166'
  sh 'cd ~/RotadeFuga-Backend'
  sh 'git pull origin master'
  sh 'curl -o-   https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash'
  sh '. ~/.nvm/nvm.sh'
  sh 'npm install -g nodemon pm2'
  sh 'pm2 restart ecosystem.config.js'
  sh 'exit'
}

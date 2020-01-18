'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the geometric ${chalk.red('generator-app')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'proj',
        message: 'What is your project name?',
        default: 'foo'
      },
      {
        type: 'confirm',
        name: 'helloworld',
        message: 'Do you want our default hello world app? (Java app deployed in a container)',
        default: true
      },
      {
        when: function (response) {
          return response.helloworld === false;
        },
        type: 'list',
        name: 'classification',
        message: 'What classification is your application?',
        choices: [ "confidnetial", "highly-sensitive", "generic", "unknown" ]
      }, 
      {
        when: function (response) {
          return response.helloworld === false;
        },
        type: 'list',
        name: 'technology_type',
        message: 'How do you plan on writing & deploying your application?',
        choices: [ "container", "custom" ]
      }, 
      {
        when: function (response) {
          return response.helloworld === false && response.technology_type === "container";
        },
        type: 'list',
        name: 'container_image',
        message: 'What will you use to write your app?',
        choices: [ "java", "python", "go" ] 
      }

      
    ];

    return this.prompt(prompts).then(props => {


      if (props.helloworld === true) {
        props.classification = 'generic';
        props.technology_type = 'container';
        props.container_image = 'java';
      }

      // To access props later use this.props.someAnswer;
      this.props = props;


    });
  }

  writing() {

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { proj: this.props.proj }
    );

    this.fs.copyTpl(
      this.templatePath('Jenkinsfile'),
      this.destinationPath('Jenkinsfile'),
      { proj: this.props.proj }
    );
    
    this.fs.copyTpl(
      this.templatePath('.repo-config.yml'),
      this.destinationPath('.repo-config.yml'),
      { 
        classification: this.props.classification,
        technology_type: this.props.technology_type,
        container_image: this.props.container_image
      }
    );


    if (this.props.technology_type === 'container') {

      this.fs.copyTpl(
        this.templatePath('Dockerfile'),
        this.destinationPath('Dockerfile'),
        { container_image: this.props.container_image }
      );      
      
      this.fs.copyTpl(
        this.templatePath('docker-compose.yml'),
        this.destinationPath('docker-compose.yml'),
        { proj: this.props.proj }
        
      );

      this.fs.copyTpl(
        this.templatePath('makefile-container'),
        this.destinationPath('makefile'),
        { proj: this.props.proj }
      );

      
    }

    if (this.props.technology_type === 'custom') {

      this.fs.copyTpl(
        this.templatePath('makefile-custom'),
        this.destinationPath('makefile'),
        { proj: this.props.proj }
      );
      
    }    


  }

  // install() {
  //   this.installDependencies();
  // }
};

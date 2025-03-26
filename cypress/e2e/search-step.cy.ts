describe('SearchStep Component', () => {
  beforeEach(() => {
    // Visit the page where the SearchStep component is rendered
    cy.visit('http://localhost:3000/');
  });

  it('should display the search form correctly', () => {
    cy.get('input[name="tarjeta"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('button').contains('Buscar').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button').contains('Buscar').click();
    
    cy.contains('Número de tarjeta requerido').should('be.visible');
    cy.contains('Correo electrónico requerido').should('be.visible');
  }); 

   it('should show validation error for invalid card number length', () => {
    cy.get('input[name="tarjeta"]').type('123');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button').contains('Buscar').click();
    
    cy.contains('Debe tener 13 dígitos').should('be.visible');
  }); 

   it('should handle case when patient is not found', () => {
  /*   cy.intercept('POST', '/individualAutoPopulateProfile', {
      statusCode: 200,
      body: [{
        data: {
          results: true,
          contacts: [{
            datosGenerales: {
              nombre: 'Juan',
              apellidoPaterno: 'Pérez',
              apellidoMaterno: 'García',
              idExterno: '12345',
              sexo: 'Masculino',
              tipo: 'TITULAR'
            },
            listaCorreoElectronico: [{
              correroElectronico: 'juan.perez@example.com'
            }],
            listaTelefonos: [{
              telefono: {
                NumeroTelefonico: '5555555555',
                IDExterno: 'phone123'
              }
            }],
            listaDireccion: [{
              direccion: {
                estado: 'ESTADO DE MEXICO',
                calle: 'Av. Reforma',
                numeroExterior: '123',
                numeroInterior: '4A',
                colonia: 'Centro',
                codigoPostal: '06500',
                delgacionMunicipio: 'Cuauhtémoc',
                ciudad: 'Ciudad de México',
                referncias: 'Entre calles',
                id_externo: 'addr123',
                latitud: '19.4326',
                longitud: '-99.1332'
              }
            }]
          }]
        }
      }]
    }); */

    cy.get('input[name="tarjeta"]').type('1234567890123');
    cy.get('input[name="email"]').type('juan.perez@example.com');
    cy.get('button').contains('Buscar').click();

    cy.contains('Prosiga a ingresar sus datos.').should('be.visible');
  }); 


  it('should handle case when patient is found', () => {
      cy.get('input[name="tarjeta"]').type('6601000000980');
      cy.get('input[name="email"]').type('edith.pichardo@fanafesa.com');
      cy.get('button').contains('Buscar').click();
  
      cy.contains('Paciente encontrado!').should('be.visible');
  }); 

  it('should handle case when patient is found with different email and confirm email', () => {
      cy.get('input[name="tarjeta"]').type('6601000000980');
      cy.get('input[name="email"]').type('edith.pichardo2@fanafesa.com');
      cy.get('button').contains('Buscar').click();
  
      cy.contains('Ya tiene un correo asociado a esta tarjeta').should('be.visible'); 

      cy.get('button').contains('Sí, continuar').click();  

      cy.get('input[name="first_name"]').should('be.visible');

  }); 

  it('should handle case when patient is found with different email and reject email', () => {
      cy.get('input[name="tarjeta"]').type('6601000000980');
      cy.get('input[name="email"]').type('edith.pichardo2@fanafesa.com');
      cy.get('button').contains('Buscar').click();

      cy.contains('Ya tiene un correo asociado a esta tarjeta').should('be.visible'); 

      cy.get('button').contains('No, modificar').click(); 

      cy.contains('Para modificar su información, favor de ponerse en contacto con correo@fanasa.com').should('be.visible');
     
      cy.get('button').contains('Cerrar').click(); 

      cy.get('input[name="tarjeta"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');

  }); 
  



   it('should handle API error gracefully', () => {
    cy.intercept('POST', '**/clients', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    });

    cy.get('input[name="tarjeta"]').type('1234567890123');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button').contains('Buscar').click();

    cy.contains('Prosiga a ingresar sus datos.').should('be.visible');

    cy.get('input[name="first_name"]').should('be.visible');
  }); 

 
}); 
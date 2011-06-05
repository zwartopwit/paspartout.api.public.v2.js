
describe('Paspartout.Api.Page.all', function() {
  
  beforeEach(resetApiData);
  
  describe('page', function() {
    
    beforeEach(function() {
      Paspartout.Api.Page.all({
        success: function(page) {
          apiData = page;
        },
        failure: function(error) {
          apiError = error;
        }
      });

      waitsFor(function() {
        return apiToReturnData();
      }, 'pages to load', 2000);
    });
    
    it('should not fail', function() {
      expect(apiError).toBeUndefined();
    });

    describe('data', function() {
      
      it('should be an array', function() {
        expect(Object.prototype.toString.call(apiData)).toBe('[object Array]');
      });
      
      it('should contain 4 pages', function() {
        expect(apiData.length).toBe(4);
      });
      
    });
    
  });
  
});

describe('Paspartout.Api.Page.load', function() {
  
  beforeEach(resetApiData);
  
  describe('page with id 3077', function() {
    
    beforeEach(function() {
      Paspartout.Api.Page.load(3077, {
        success: function(page) {
          apiData = page;
        },
        failure: function(error) {
          apiError = error;
        }
      });

      waitsFor(function() {
        return apiToReturnData();
      }, 'page to load', 2000);
    });
    
    it('should not fail', function() {
      expect(apiError).toBeUndefined();
    });

    describe('data', function() {
      
      it('should be a portfolio page', function() {
        expect(apiData.type).toBe('portfolio');
      });
      
      it('should have 3 children', function() {
        expect(apiData.children.length).toBe(3);
      });
      
    });
    
  });
  
});
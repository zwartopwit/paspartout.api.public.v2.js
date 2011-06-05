
describe('Paspartout.Api.Site.load', function() {
  
  beforeEach(resetApiData);
  
  describe('site', function() {
    
    beforeEach(function() {
      Paspartout.Api.Site.load({
        success: function(site) {
          apiData = site;
        },
        failure: function(error) {
          apiError = error;
        }
      });

      waitsFor(function() {
        return apiToReturnData();
      }, 'site to load', 2000);
    });
    
    it('should not fail', function() {
      expect(apiError).toBeUndefined();
    });

    describe('data', function() {
      
      it('should be the site with given id', function() {
        expect(apiData.subdomain).toBe('gmc');
      });

      it('should contain its menu with 4 pages', function() {
        expect(apiData.menu.length).toBe(4);
      });
      
      it('should return cached data', function() {
        expect(apiData._request.cached).toBeTruthy();
      });
    });
    
  });
  
  describe('uncached site', function() {
    
    beforeEach(function() {
      Paspartout.Api.Site.load({
        cache: false,
        
        success: function(site) {
          apiData = site;
        },
        failure: function(error) {
          apiError = error;
        }
      });

      waitsFor(function() {
        return apiToReturnData();
      }, 'site to load', 2000);
    });
    
    describe('data', function() {
      
      it('should be uncached data the first time', function() {
        expect(apiData._request.cached).toBe(false);
      });
      
      it('should be uncached data the second time', function() {
        expect(apiData._request.cached).toBe(false);
      });
      
      it('should be uncached data the third time', function() {
        expect(apiData._request.cached).toBe(false);
      });
      
    });
    
  });
  
});




























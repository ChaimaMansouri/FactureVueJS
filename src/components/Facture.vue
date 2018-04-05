<template>
<div>
  <div class="container">
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Facture</h3>
  </div>
  <div class="panel-body">
   <div class="row">
     <div class="col-md-5">
       <label>Société:</label>
  <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
    <input type="text" class="form-control" v-model="company.name" placeholder="Nom de votre société" required>
  </div>
  <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
    <input type="text" class="form-control" v-model="company.adresse" placeholder="adresse" required>
  </div>
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
    <input v-validation-tel type="text" class="form-control" v-model="company.tel" placeholder="tel" required>
  </div>
<div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="email" class="form-control" v-model="company.email" placeholder="Email" required>
  </div>
</div>
<div class="col-md-2"></div>
     <div class="col-md-5">
       <label>Client:</label>
  <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
    <input type="text" class="form-control" v-model="client.name" placeholder="Nom du client" required>
  </div>
  <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
    <input type="text" class="form-control" v-model="client.adresse" placeholder="adresse du client" required>
  </div>
    <div class="input-group">
    <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
    <input type="date"  v-model="date" class="form-control">
  </div>
</div>
   </div>
 
  <br>
    <div class="row">
      <div class="col-md-4">
       <label>Référence de la facture:</label></div>
        <div class="col-md-6">
    <input type="text" class="form-control" v-model.number="ref" placeholder="28">       
      </div>
      <div class="col-md-4">
       <label>Intitulé de la facture:</label>
      </div>
       <div class="col-md-6">
    <input type="text" class="form-control" v-model="title" required>        
        </div>      
    </div>
  <br/>
<br/>
<button type="button" class="btn btn-default btn-success btn-xs"  v-on:click="addProduct" style="float:right"><i class="glyphicon glyphicon-plus"></i></button>
  <table class="table">
    <thead>
      <tr>
      <th>Quantité</th>
      <th>Désignation</th>
      <th>Prix unitaire HT</th>
      <th>Prix total HT</th>   
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product,cle) in products" :key="cle">
        
        <td><input class="form-control"  v-model.number="product.quantite"></td>
        <td><input class="form-control" v-model="product.name"></td>
        <td><input class="form-control" v-model.number="product.prix_unit"></td>
        <td>{{calculPrix(cle)}}</td>
        <i class="glyphicon glyphicon-trash" v-on:click="delProduct(cle)"></i>           
      </tr>
      <tr>
        <td colspan="2">Total Hors Taxe:</td>
        <td></td>
        <td>{{calculSomme}}</td>
      
      </tr>
      <tr>
        <td colspan="2">TVA:</td>
        <td><div class="input-group">
    <span class="input-group-addon">%</span>
    <input type="text" class="form-control" v-model.number="tva" placeholder="20">
  </div></td>
         <td>{{calculTva}}</td>
      </tr>
      <tr>
        <td  colspan="2">Total:</td>
        <td></td>
        <td >{{calculTotal}}</td>
      </tr>
    </tbody>
  </table>
  <br>
  <br>
   <br>
  <br>
  <div style="float:right">
  <button class="btn btn-success" type="submit" v-on:click="afficher">Terminer</button>

<button type="button" class="btn btn-primary hidden" data-toggle="modal"  id="modalId" data-target=".bs-example-modal-lg">Voir Facture</button>
  <button class="btn btn-default" type="submit" v-on:click="reset">Annuler</button>
  <br>
   </div><br><br><br>
  <div class="alert alert-danger" role="alert" v-if="errormsg!=''">{{errormsg}}</div>
  <br>
  <br>
 </div>
  </div>
 <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div style="border: 2px solid;border-radius: 25px;margin:30px">
        <div class="row">
          <div class="col-md-6">
            <label style="margin-top: 30px;font-size: 200%;font-family: 'Times New Roman', Times, serif;font-weight: bold;">
              {{company.name}}
            </label><br>
            <div style="text-align: left; margin-left: 30px;">
            <label>Adresse:</label>
            <label style="font-size: large;font-family: 'Times New Roman', Times, serif;">
              {{company.adresse}}
            </label><br>
            <label>Tel:</label>            
            <label style="font-size: large;font-family: 'Times New Roman', Times, serif;">
              {{company.tel}}
            </label><br>
            <label>E-mail:</label>            
            <label style="font-size: large;font-family: 'Times New Roman', Times, serif;">
              {{company.email}}
            </label>
            </div>
            </div>
            <br><br><br><br><br><br><br>
            <div  class="col-md-5">
             <div style="border: 2px solid;border-radius: 25px;">
            <label style="font-size: 200%;font-family: 'Times New Roman', Times, serif;font-weight: bold;">
              {{client.name}}
            </label><br>
            <div style="text-align: left;margin-left: 30px;">
            <label>Adresse:</label>
            <label style="font-size: large;font-family: 'Times New Roman', Times, serif;">
              {{client.adresse}}
            </label>
            </div>
            </div>
            <br><div  style="text-align:right"><label>{{date}}</label></div>
        </div>
            <br><br><br>
          </div>
          <div>
            <br><br><br/>
            <label style="font-size: 250%;font-family: 'Times New Roman', Times, serif;font-weight: bold;">
              Facture n°: {{ref}}
            </label><br><br><br>
            <div style="text-align:left;margin-left: 30px;">
            <label style="text-align:right;font-size: large;font-family: 'Times New Roman', Times, serif;font-weight: bold;">
              Intitulé: {{title}}
            </label></div>
          </div>
          <br><br><br/>
          <table class="table table-bordered">
            <thead>
              <tr>
            <th>Quantité</th>
      <th>Désignation</th>
      <th>Prix unitaire HT</th>
      <th>Prix total HT</th> 
              </tr>
            </thead>
              <tbody>
      <tr v-for="(product,cle) in products" :key="cle">
        <td>{{product.quantite}}</td>
        <td>{{product.name}}</td>
        <td>{{product.prix_unit}}</td>
        <td>{{product.prix}}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
        <td class="active">Total Hors Taxe :</td>
        <td class="active">{{totalHT}}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
        <td  class="active">TVA {{tva}}% :</td>
        <td  class="active">{{prixTVA}}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
        <td class="active">Total :</td>
        <td class="active">{{total}}</td>
        </tr>
        </tbody>
          </table>
          <br><br><br><br>
        </div>
  </div>
    </div>
  </div>
</div>
</div>


</template>

<script>
function getDefaultData() {
  return {
    company: {
      name: "",
      adresse: "",
      tel: "",
      email: ""
    },
    client: {
      name: "",
      adresse: ""
    },
    date: "",
    ref: "",
    title: "",
    products: [
      {
        quantite: 0,
        name: "",
        prix_unit: 0,
        prix: 0
      }
    ],
    totalHT: 0,
    tva: 0,
    prixTVA: 0,
    total: 0,
    errormsg: ""
  };
}
export default {
  name: "Facture",
  data() {
    return getDefaultData();
  },
  computed: {
    calculSomme() {
      this.totalHT = 0;
      this.products.forEach(element => {
        this.totalHT = this.totalHT + element.prix;
      });
      return this.totalHT;
    },
    calculTva() {
      this.prixTVA = this.totalHT * this.tva / 100;
      return this.prixTVA;
    },
    calculTotal() {
      this.total = this.totalHT + this.prixTVA;
      return this.total;
    }
  },
  methods: {
    addProduct: function(e) {
      this.products.push({
        quantite: 0,
        name: "",
        prix_unit: 0,
        prix: 0
      });
      e.preventDefault();
    },

    delProduct: function(cle) {
      this.products.splice(cle, 1);
    },
    calculPrix(i) {
      this.products[i].prix =
        this.products[i].quantite * this.products[i].prix_unit;
      return this.products[i].prix;
    },
    reset: function() {
      Object.assign(this.$data, getDefaultData());
    },
    afficher: function() {
      if (
        this.$data.company.name != "" &&
        this.$data.company.adresse != "" &&
        this.$data.company.tel != "" &&
        this.$data.client.name != "" &&
        this.$data.client.adresse != "" &&
        this.$data.data != "" &&
        this.$data.title != ""
      ) {
        this.$data.errormsg = "";
        if (this.$data.products.length > 0) {
          this.$data.errormsg = "";
          if (
            this.$data.products.findIndex(
              element =>
                element.quantite == 0 ||
                element.prix_unit == 0 ||
                element.title == ""
            ) == -1
          ) {
            document.getElementById("modalId").click();
          } else {
            this.$data.errormsg =
              "Verifiez les valeurs et les noms de vos produits";
          }
        } else {
          this.$data.errormsg = "Votre tableau de produits est vide";
        }
      } else {
        this.$data.errormsg =
          "Verifiez les coordonnées de votre société et de votre client, Tous les champs doivent etre remplis";
      }
    }
  }
};
</script>

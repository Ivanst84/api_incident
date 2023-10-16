
const Incident = require("../models/incident");
function holaMundo(req,res){



}
async function createIncident(req,res){
    const incident= new Incident();
    const params = req.body;
    
    incident.title = params.title;
    incident.description = params.description;
    incident.user = params.user;
    incident.severity = params.severity;
    console.log(incident.title);
    try{

        const incidentStore = await incident.save();
        if(!incidentStore){
            res.status(400).send({msg:"NO se a guardado la incidencia"});
        }
            else{
                res.status(200).send({incident:incidentStore})
            }
    }catch(error){
        res.status(500).send(error);

    }

}


async function getIncidents(req,res){
try {
const incidents = await Incident.find().sort({create_at:1});
if(!incidents)  {
    res.status(400).send({msg:"Error al obtner las incidencias"});

}  else{
    res.status(200).send(incidents);
}
} catch (error) 
{
    res.status(500).send(error);
}}

async function getIncidentsBySeverity(req,res){

    const params = req.query;
    const severity = params.severity;
    try {
      const incidents = await Incident.find({severity:severity}).sort({create_at:1});  
   
     if(!incidents){
        res.status(400).send({msg:"Erorr en obtener las inicidencias"});
     }else{
        res.status(200).send(incidents);
     }
   
    } catch (error) {
        res.status(500).send(error)
    }

}
async function getIncidentsByState(req,res){
    const params = req.query;
    const completed=params.completed;
    try {
        const incidents = await Incident.find({completed:completed}).sort({create_at:1});
        if(!incidents){
            res.status(400).send({msg:"Erorr en obtener los estados de incidencia"});

        } else{
            res.status(200).send(incidents);
        }
    } catch (error) {
        res.status(500).send(error);

    }
}
async function updateIncident(req,res){
    const params =req.body;
    const idIncident = params.id;
    try {
        const incident = await Incident.findByIdAndUpdate(idIncident, params);
        if(!incident){
            res.status(400).send({msg:"No se a podido actualizar la incidencia"});

        }else{
            res.status(200).send({msg:"Actualización completada correctamente"});

        }
    } catch (error) {
        res.status(500).send(error);

        
    }
}
async function deleteIncident(req,res){
    const  params=req.body;
    const idIncident = params.id;
    try {
        const incident = await Incident.findByIdAndDelete(idIncident);
        if(!incident){
            res.statuts(400).send({msg:"No se pudo eliminar la incidencia"});
        }else{
            res.status(200).send({msg: "Se a eliminado correctamente la incidencia"})
        }
    } catch (error) {
        res.status(500).send(error);
        
    }
}
module.exports ={
    holaMundo,
    createIncident,
    getIncidents,
    getIncidentsBySeverity,
    getIncidentsByState,
    updateIncident,
    deleteIncident
}
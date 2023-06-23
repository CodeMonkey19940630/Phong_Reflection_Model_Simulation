#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 fragLightVector;
layout(location = 3) in vec3 fragEyeVector;
layout(location = 4) in vec3 fragSpecularLighting;
layout(location = 5) in vec3 fragDiffuseLighting;
layout(location = 6) in vec3 fragAmbientLighting;
layout(location = 7) in float fragSpecularCoefficient;
layout(location = 8) in vec3 fragNormal;
layout(location = 9) in vec3 fragLightAttenuation;


layout(location = 0) out vec4 outColor; 
layout(binding = 2) uniform  sampler2D texSampler; 


void main() {

   vec3 ambientLight = fragAmbientLighting ;
   vec3 normEyeVector = normalize(fragEyeVector);
   float d = fragLightVector.length();
   float dxd = d * d;
   float AttenuationCoe = 1 / (fragLightAttenuation.x *dxd + fragLightAttenuation.y * d +  fragLightAttenuation.z);
   vec3 normLightVector = normalize(fragLightVector);
   vec3 normNormal = normalize(fragNormal);

   float diffuseDotProduct = max(dot(normLightVector,normNormal),0.0f);
   vec3  diffuseLight = fragDiffuseLighting  * diffuseDotProduct;
   vec3 halfAngleVector = normalize(normEyeVector + normLightVector );

   float SpecularDotProduct = max(dot(halfAngleVector,normNormal),0.0f);
   float specularPower = pow(SpecularDotProduct,fragSpecularCoefficient);
   vec3 SpecularLight = fragSpecularLighting * specularPower;
   vec3 LightColor =  diffuseLight + SpecularLight + ambientLight;

   vec4 textureColor = texture(texSampler,fragTexCoord);

   outColor = vec4(LightColor,1.0f) * textureColor * AttenuationCoe;
    // outColor = vec4(fragSpecularCoefficient,fragSpecularCoefficient,fragSpecularCoefficient,1.0f);
   
   //outColor = vec4(diffuseLight,1.0f);

}